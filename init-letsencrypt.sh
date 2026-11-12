#!/bin/bash

if ! [ -x "$(command -v docker compose)" ]; then
  echo 'Error: docker compose is not installed.' >&2
  exit 1
fi

domains=(leanjust.com www.leanjust.com) # REPLACE_WITH_YOUR_TOKENS
rsa_key_size=4096
data_path="./data/certbot"
email="josh.zhao@leanjust.com" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

# # ---------------------------------------------------------------------------
# # Pre-flight: every domain must resolve to THIS server's public IP, otherwise
# # Let's Encrypt cannot download the challenge files and issuance fails with
# # "The Certificate Authority failed to download the temporary challenge files".
# # ---------------------------------------------------------------------------
# echo "### Pre-flight: checking DNS resolution ..."
# server_ip=$(curl -s -m 10 https://api.ipify.org || true)
# if [ -z "$server_ip" ]; then
#   echo "WARNING: unable to determine this server's public IP; skipping DNS check."
# fi
# for domain in "${domains[@]}"; do
#   domain_ip=$(dig +short "$domain" 2>/dev/null | grep -E '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$' | tail -1)
#   if [ -n "$server_ip" ] && [ "$domain_ip" != "$server_ip" ]; then
#     echo "ERROR: $domain resolves to '${domain_ip:-no A record}' but this server's public IP is '$server_ip'."
#     echo "Let's Encrypt validation will fail. Fix the DNS records first:"
#     echo "  - point an A record for the domain to this server's IP ($server_ip)"
#     echo "  - if using Cloudflare, set the record to 'DNS only' (grey cloud):"
#     echo "    the proxy (orange cloud) hides the real IP and 'Always Use HTTPS'"
#     echo "    breaks the HTTP-01 challenge on port 80"
#     echo "  - make sure inbound port 80 is open (firewall / security group)"
#     exit 1
#   fi
#   echo "  $domain -> ${domain_ip:-unresolved} (server: $server_ip)"
# done
# echo

mkdir -p "$data_path/conf" "$data_path/www"

if [ -d "$data_path/conf/live" ]; then
  read -p "Existing certificates found. Continue and replace them? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi


if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/refs/heads/main/certbot/src/certbot/_internal/plugins/nginx/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/refs/heads/main/certbot/src/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

primary_domain="${domains[0]}"
path="/etc/letsencrypt/live/$primary_domain"
mkdir -p "$data_path/conf/live/$primary_domain"
echo "### Creating dummy certificate for $primary_domain ..."
docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo


echo "### Starting nginx ..."
docker compose up --force-recreate -d web
echo

echo "### Deleting dummy certificate for $domains ..."
docker compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$domains && \
  rm -Rf /etc/letsencrypt/archive/$domains && \
  rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
echo


echo "### Requesting Let's Encrypt certificate for $domains ..."
#Join $domains to -d args
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="-m $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Reloading nginx ..."
docker compose exec web nginx -s reload
