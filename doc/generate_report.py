"""Generate the code review report as a Word document."""
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

OUT = "/Users/josh/solution/company-website/doc/Company-Website-Code-Review-Report.docx"

doc = Document()

# ---------- base styles ----------
style = doc.styles["Normal"]
style.font.name = "Calibri"
style.font.size = Pt(11)

def h1(text):
    return doc.add_heading(text, level=1)

def h2(text):
    return doc.add_heading(text, level=2)

def h3(text):
    return doc.add_heading(text, level=3)

def p(text, bold=False, italic=False):
    para = doc.add_paragraph()
    run = para.add_run(text)
    run.bold = bold
    run.italic = italic
    return para

def bullet(text, bold_prefix=None):
    para = doc.add_paragraph(style="List Bullet")
    if bold_prefix:
        r = para.add_run(bold_prefix)
        r.bold = True
        para.add_run(text)
    else:
        para.add_run(text)
    return para

def code(text):
    para = doc.add_paragraph()
    run = para.add_run(text)
    run.font.name = "Consolas"
    run.font.size = Pt(9)
    return para

def issue(number, severity, title, detail, impact, recommendation):
    h3(f"Issue #{number} [{severity}] - {title}")
    p(detail)
    if impact:
        para = p("Impact: ", bold=True)
        para.add_run(impact)
    para = p("Recommendation: ", bold=True)
    para.add_run(recommendation)

# ---------- Title page ----------
title = doc.add_heading("Company Website (leanjust.com) - Technical Review Report", level=0)
subtitle = doc.add_paragraph()
subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = subtitle.add_run("Project: company-website  |  Location: /Users/josh/solution/company-website\nReviewed by: Automated static code review (pi coding agent)\nBuild status: pnpm build passes; pnpm lint: 0 errors, 1 warning")
r.italic = True
doc.add_paragraph()

# ---------- 1. Executive Summary ----------
h1("1. Executive Summary")
p("The repository contains a modern, bilingual company marketing website built with React 19 + TypeScript and Bootstrap 5, bundled with Vite. It presents products (including iDAP and iSMS), services, solutions, resources and company information, and adds Google sign-in via Firebase Authentication. User profiles are persisted in a PostgreSQL database behind a small Express 5 API that verifies Firebase ID tokens. Deployment is via Docker Compose: Nginx (TLS via Let's Encrypt/certbot) serving the static SPA and reverse-proxying /api to the Node service, plus a PostgreSQL container. Content copy is localized (English/Chinese) via i18next with locale JSON files loaded at runtime so text can be edited without rebuilding the image.")
p("The overall architecture is sound and the build/lint pipeline is clean. However, the review identified 19 issues, including 3 critical security concerns (client-side-only authorization for admin features, direct browser writes to Firestore, and a weak/committed database password on the local machine), along with several high- and medium-priority improvements such as missing route-level input validation, no 404 route, missing code splitting, and duplication between the SQL schema and the runtime DDL.")

# ---------- 2. Folder Structure ----------
h1("2. Folder Structure")
code(
"""company-website/
├── docker-compose.yml       # web (nginx) + api (node) + db (postgres) + certbot
├── Dockerfile               # 2-stage: build React app -> nginx:alpine
├── Dockerfile.api           # node:24-alpine running the Express API
├── nginx.conf               # HTTP->HTTPS redirect, /api proxy, SPA fallback
├── init-letsencrypt.sh      # bootstrap script for TLS certificates
├── .env / .env.example      # DB_PASSWORD, FIREBASE_SERVICE_ACCOUNT_JSON
├── index.html               # SPA entry point
├── vite.config.ts           # Vite + React plugin, dev /api proxy
├── tsconfig*.json / eslint.config.js
├── package.json             # scripts: dev, api, build, lint, preview
├── pnpm-lock.yaml
├── server/                  # Express 5 profile API (plain JS)
│   ├── index.js             # REST endpoints: /api/health, /api/profile, /api/profile/bootstrap
│   ├── db.js                # pg Pool + initDb() DDL (duplicates schema.sql)
│   ├── firebaseAdmin.js     # firebase-admin credential init + token verification
│   └── schema.sql           # market_client table definition
├── data/certbot/            # Let's Encrypt certificate storage (gitignored)
├── public/locales/          # en.json, zh.json — runtime-editable translations
├── dist/                    # production build output (gitignored)
└── src/                     # React application
    ├── App.tsx              # routes
    ├── main.tsx             # entry, awaits i18n init
    ├── i18n.ts              # i18next + browser language detector
    ├── firebase.ts          # client SDK config (hardcoded)
    ├── types.ts
    ├── context/AuthContext.tsx   # Google sign-in, isAdmin from Firestore role
    ├── components/          # Header, Footer, Layout, LoginModal,
    │                        # ProtectedRoute, EditProductModal, EditServiceModal
    ├── pages/               # Home, Products (+Idap, +Isms), Services,
    │                        # Solutions, Resources, About, Profile, AdminDashboard
    ├── data/                # static seed data (products, services, solutions)
    └── utils/               # makeAdmin.ts, uploadData.ts (Firestore seed from browser)"""
)

# ---------- 3. Tech Stack ----------
h1("3. Technology Stack")
bullet("React 19.2 with TypeScript 5.9 - SPA UI framework")
bullet("React Router DOM 7 - client-side routing (BrowserRouter)")
bullet("Bootstrap 5.3 + React Bootstrap 2.10 - responsive UI components")
bullet("React Icons 5 - icon set")
bullet("i18next 25 / react-i18next / i18next-browser-languagedetector - EN/ZH localization, runtime-loaded JSON")
bullet("Firebase 12 client SDK (Authentication with Google popup sign-in, Firestore for roles and content)")
bullet("Vite 7 - dev server and production bundler; pnpm as package manager")
bullet("Backend: Express 5 on Node 24, firebase-admin 13 for ID-token verification, pg 8 for PostgreSQL")
bullet("Database: PostgreSQL (table market_client, auto-created on boot and via docker-entrypoint-initdb.d)")
bullet("Deployment: Docker Compose with 4 services - nginx web (80/443), api (3001, internal), postgres 5432, certbot renewal loop")
bullet("Tooling: ESLint 9 (typescript-eslint, react-hooks, react-refresh plugins), Docker multi-stage build")

# ---------- 4. Functionality Summary ----------
h1("4. Functional Summary")
h2("4.1 Public content pages")
bullet("Home: hero section, company overview, key features (content from locale files).")
bullet("Products: catalog loaded from Firestore (ordered by id) with featured badges, pricing and features; sub-pages for iDAP and iSMS products.")
bullet("Services: service offerings loaded from Firestore, with admin inline editing (EditServiceModal).")
bullet("Solutions: industry-specific solutions loaded from Firestore.")
bullet("Resources: documentation/tutorials/case studies; About: company information, mission and team.")
h2("4.2 Authentication and user management")
bullet("Google sign-in popup via Firebase Authentication (LoginModal in Header).")
bullet("On first login a Firestore users/{uid} document is created with role: 'user'; admin role is assigned by updating that document (utils/makeAdmin.ts).")
bullet("After login the client POSTs /api/profile/bootstrap with the Firebase ID token; the Express API verifies the token with firebase-admin and upserts a row in PostgreSQL market_client.")
h2("4.3 Profile management")
bullet("/profile (protected): form to view/edit first name, last name, email, phone, company, address, city, country, persisted through GET/PUT /api/profile.")
h2("4.4 Admin capabilities")
bullet("/admin (protected, requireAdmin): AdminDashboard with a button that seeds products/services/solutions data into Firestore from the client bundle (utils/uploadData.ts).")
bullet("Admins see Edit buttons on Products and Services cards to modify Firestore documents directly from the browser.")
h2("4.5 Internationalization")
bullet("EN and ZH translations fetched from /locales/*.json with no-store caching; docker-compose mounts ./public/locales read-only into nginx so copy can be changed on the host without a rebuild.")
h2("4.6 Infrastructure")
bullet("Nginx terminates TLS (Let's Encrypt via certbot, reloaded every 6h), redirects HTTP to HTTPS, proxies /api to the api container, and falls back to index.html for SPA routes.")
bullet("PostgreSQL with named volume persistence and a healthcheck gating API startup.")

# ---------- 5. Issues ----------
h1("5. Issues Found")
p("Severity levels: CRITICAL (security risk or data loss), HIGH (functional gap / robustness), MEDIUM (quality / maintainability), LOW (polish).", italic=True)

h2("5.1 CRITICAL")

issue(1, "CRITICAL", "Admin authorization is enforced on the client only",
      "The isAdmin state comes from reading the Firestore users/{uid}.role field in the browser (src/context/AuthContext.tsx) and gating routes/components with ProtectedRoute. There is no server-side verification of the admin role anywhere: admin actions (uploadDataIndex batch write, EditProductModal/EditServiceModal writes) are executed directly from the browser using the public Firebase client SDK.",
      "Anyone who obtains the Firebase web config (it is shipped in the bundle) and has any account - or simply calls the Firestore SDK - can attempt writes to products/services/solutions, depending on Firestore security rules. The whole admin model is spoofable if rules are not locked down, and there are no rules files in the repo to prove they are.",
      "Move all admin mutations (data upload, product/service edits) behind the Express API, verifying both the Firebase ID token and the user role server-side (or via Firebase custom claims, which are cryptographically part of the ID token). Commit firestore.rules to the repository so the server-side posture is auditable.")

issue(2, "CRITICAL", "Weak production database password present in local .env",
      "The local .env file (gitignored, not in Git history - verified) contains a short, low-entropy DB_PASSWORD (masked here for security - see the local file), plus a Firebase service-account private key. docker-compose.yml falls back to DB_PASSWORD=change-me if the variable is unset. If that weak password is the one actually used on the production host, the PostgreSQL container is trivially brute-forceable (especially if port 5432 is ever exposed).",
      "Live database compromise, profile data (names, emails, phone numbers, addresses, companies) exposure.",
      "Generate a long random password (e.g. 32+ chars via openssl rand -base64 32), rotate it in production, restrict the postgres service to internal networks only (it currently has no ports mapping, which is good - keep it that way), and consider a secrets manager instead of an .env file. Remove the weak fallback default in docker-compose.yml.")

issue(3, "CRITICAL", "No Firestore security rules committed; client writes rely on unverified trust",
      "The client SDK writes to Firestore collections (products, services, solutions, users) directly. makeAdmin.ts promotes users by writing role: 'admin' from a client-side script, and AuthContext itself writes user documents. No firestore.rules file exists in the repository.",
      "If the Firebase console rules are open (a very common default, and the browser-based admin feature cannot work otherwise), any authenticated user - or anyone at all if rules allow - can overwrite site content or self-promote to admin by writing role: 'admin' to their own user document.",
      "Adopt a deny-by-default rules file: users can write only their own user doc (and never the role field); products/services/solutions readable by everyone but writable only through the API or by users validated via custom claims. Use Firebase Admin custom claims for roles instead of a readable/writable Firestore field.")

h2("5.2 HIGH")

issue(4, "HIGH", "PUT /api/profile accepts arbitrary email changes without validation",
      "The API takes all profile fields from the request body with only trim/null cleaning; there is no email format validation and no verification that the new email belongs to the user. A signed-in user can store any email string, and since email is only indexed (not unique) duplicates are possible.",
      "Data quality degradation; marketing/contact data in market_client can be poisoned; email-based reporting or joins can silently mis-associate records.",
      "Validate email format server-side; either derive email from the verified Firebase token instead of the body, or restrict changes to phone/company/address only and treat email as an immutable identity field.")

issue(5, "HIGH", "No catch-all (404) route - unknown URLs render a blank page",
      "App.tsx defines routes for /, products, services, solutions, resources, about, profile and admin, but no path='*' element. Navigating to any other URL renders the Layout with no content - a white page with a header/footer only, and a 200 status from the SPA shell.",
      "Poor UX and bad for SEO/crawlers.",
      "Add a Route path='*' rendering a styled NotFound page (and consider emitting a proper 404 status via SSR or at least noindex for the fallback).")

issue(6, "HIGH", "Entire application is blocked behind auth loading state",
      "AuthProvider renders {!loading && children}. Until onAuthStateChanged fires (and the extra Firestore getDoc for the role completes), the user sees a completely blank page - no header, no content, no spinner. Firebase auth restoration can take noticeable time, especially on first visit or slow networks.",
      "A flash of blank screen for every visitor, public content included.",
      "Render the app shell and public routes immediately; use the loading state only to gate protected routes (ProtectedRoute already handles this with a Loading indicator).")

issue(7, "HIGH", "Single 770 KB JS bundle - no code splitting",
      "The production build emits one 769.83 KB (242.55 KB gzip) chunk plus a 231 KB CSS file, and Vite itself warns that chunks exceed 500 KB. hero-bg.png alone is 749 KB. Firebase + Firestore + i18n resources are all bundled eagerly even for anonymous visitors who never log in.",
      "Slower first paint on mobile connections; Lighthouse performance penalty.",
      "Lazy-load route-level components with React.lazy + Suspense; dynamically import Firebase/Auth modules; compress or resize hero-bg.png (target < 200 KB, e.g. WebP); use manualChunks to split vendor code.")

issue(8, "HIGH", "Admin 'Upload Initial Data' can duplicate documents on every click",
      "uploadData.ts uses writeBatch with doc(collection(db, 'products')) - auto-generated document IDs - for every upload. Clicking the button twice creates a second full set of products/services/solutions; the confirm() dialog is the only guard.",
      "Duplicated site content that must be cleaned up manually in the Firebase console; products page would render doubles.",
      "Use deterministic document IDs (e.g. doc(db, 'products', String(product.id))) with set(..., { merge: true }) or delete-then-write semantics.")

h2("5.3 MEDIUM")

issue(9, "MEDIUM", "schema.sql and db.js duplicate the DDL",
      "The market_client table definition exists in both server/schema.sql (used by docker-entrypoint-initdb.d) and initDb() in server/db.js. They can drift apart silently.",
      "Schema drift between environments; migration hazards later.",
      "Keep a single source of truth: either run schema.sql from initDb(), or drop the runtime DDL and rely on the init script plus a proper migration tool (node-pg-migrate, drizzle, etc.).")

issue(10, "MEDIUM", "Admin role changes require re-login and are not fail-safe",
      "isAdmin is computed once in onAuthStateChanged. If the role is changed in Firestore the UI will not reflect it until the next auth event; a failed getDoc in that effect leaves isAdmin=false without surfacing any error to the user.",
      "Stale permissions, silent failures.",
      "Force an ID-token refresh / use custom claims (they propagate automatically and are verifiable server-side), and handle role-fetch errors explicitly.")

issue(11, "MEDIUM", "Inline i18n fallback ternaries duplicated throughout Products.tsx",
      "The pattern t(`products.items.${id}.name`) !== `products.items.${id}.name` ? t(...) : product.name is repeated for name, category and description within JSX. The same pattern likely exists in Services.tsx.",
      "Hard to read, easy to introduce translation bugs, untestable.",
      "Extract a helper (e.g. translateWithFallback(key, fallback)) or use i18next's built-in defaultValue option.")

issue(12, "MEDIUM", "Duplicated i18n content strategy: Firestore data vs locale JSON",
      "Content lives in two places at once - structured records in Firestore and per-item translations in public/locales/*.json - with ad-hoc client-side merging. The EditProductModal edits Firestore English text, but localized text comes from locale files, so an admin edit will not update the Chinese copy.",
      "Edits appear not to work for non-English visitors; content workflow is confusing.",
      "Pick one content source (Firestore documents with per-language fields, or locale JSON only), and make the admin UI edit the same source the pages read.")

issue(13, "MEDIUM", "index.html references stale template artifacts",
      "index.html points the favicon at /vite.svg (not present in public/) and the script at /src/main.jsx, while the entry file is src/main.tsx. The <title> is the bare domain 'leanjust.com' and no meta description is set.",
      "404 favicon; inconsistent entry reference (works only because Vite resolves it); weak SEO/branding.",
      "Update to /src/main.tsx, add a real favicon, set a branded title and description meta tags (ideally localized).")

issue(14, "MEDIUM", "Postgres volume mount points at /var/lib/postgresql/ instead of .../data",
      "docker-compose.yml mounts postgres_data:/var/lib/postgresql/. The official postgres image stores data in /var/lib/postgresql/data and the official guidance warns against bind-mounting/named-volume on the parent directory path in some setups; it also interacts badly if PGDATA defaults change.",
      "Works today, but fragile against image upgrades.",
      "Mount to /var/lib/postgresql/data explicitly.")

issue(15, "MEDIUM", "No API-level hardening: rate limiting, logging or error middleware",
      "The Express API has no rate limiter, no structured logging, no centralized error handler, and no request timeout. Every token-protected endpoint does its own try/catch with ad-hoc status codes. express.json is used without any schema validation library (zod/joi).",
      "The profile endpoints can be hammered; operational debugging is console.log-only.",
      "Add express-rate-limit (or nginx limit_req), a JSON schema validator, and a single error-handling middleware; emit structured logs.")

h2("5.4 LOW")

issue(16, "LOW", "Admin UI uses confirm()/alert() primitives",
      "AdminDashboard uses native confirm/alert dialogs, inconsistent with the Bootstrap modal styling used everywhere else.",
      "Inconsistent UX.",
      "Use react-bootstrap modals or toasts.")

issue(17, "LOW", "Lint warning: AuthContext exports non-component symbols",
      "react-refresh/only-export-components warns that exporting useAuth from AuthContext.tsx breaks fast refresh for that module (the only lint warning in the codebase).",
      "Slower HMR iteration for the auth module.",
      "Move useAuth to a separate hooks file (e.g. src/hooks/useAuth.ts).")

issue(18, "LOW", "Server is plain JavaScript with no tests and no type checking",
      "The server/ directory is untyped .js with no test suite and no CI pipeline; the client also has zero tests. The repo has no CI configuration (no GitHub Actions, etc.).",
      "Regressions in token verification or SQL upserts would be caught only in production.",
      "Port the server to TypeScript (or at least add JSDoc types + tsc --noEmit), add vitest tests for the API and AuthContext, and add a CI workflow running lint + build + test.")

issue(19, "LOW", "Leftover/dead files",
      "src/locales/ is an empty directory; src/assets/react.svg and dist/ artifacts are template leftovers; .DS_Store files exist in the tree; measurementId is defined but analytics is never initialized.",
      "Repo clutter.",
      "Remove empty directories and unused assets; add a .gitignore rule or cleanup for .DS_Store.")

# ---------- 6. Recommendations ----------
h1("6. Prioritized Recommendations")
h2("Immediate (before next production release)")
bullet("Move admin mutations server-side and adopt Firebase custom claims + committed firestore.rules (Issues 1, 3).")
bullet("Rotate the database password and remove weak fallbacks (Issue 2).")
bullet("Add email validation / server-derived email on PUT /api/profile (Issue 4).")
bullet("Add a 404 catch-all route (Issue 5).")
h2("Short term (next sprint)")
bullet("Unblock public rendering during auth loading (Issue 6).")
bullet("Code splitting + image optimization (Issue 7).")
bullet("Deterministic IDs for the data seeder (Issue 8).")
bullet("Consolidate DDL into one place (Issue 9).")
h2("Mid term")
bullet("Unify the content/i18n strategy so admin edits affect all languages (Issues 11-12).")
bullet("API hardening: rate limiting, validation, structured logging, error middleware (Issue 15).")
bullet("TypeScript for the server, test suite, and CI pipeline (Issue 18).")
bullet("Fix index.html metadata, volume mounts and dead files (Issues 13, 14, 16, 17, 19).")

# ---------- 7. Conclusion ----------
h1("7. Conclusion")
p("This is a well-structured, modern React SPA with a sensible separation between static marketing content, an authenticated profile feature backed by PostgreSQL, and Dockerized production deployment with automatic TLS. The build is green and the codebase is small and readable (~1,600 lines of frontend code plus a compact API).")
p("The main risk area is the authorization model: admin capability is granted by a client-readable Firestore field and exercised through direct browser writes with no server-side verification and no committed security rules - combined with a weak database password, this is the first thing to fix. With those items addressed and the robustness/UX gaps closed (404 route, auth-loading flash, bundle size), the site is in good shape for production.")

doc.save(OUT)
print("Saved:", OUT)
