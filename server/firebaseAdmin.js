import admin from 'firebase-admin';

function parseServiceAccount() {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

    if (typeof serviceAccount.private_key === 'string') {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return serviceAccount;
  } catch (error) {
    throw new Error(
      `Invalid FIREBASE_SERVICE_ACCOUNT_JSON. Check JSON quoting and private_key newlines. ${error.message}`
    );
  }
}

function getCredential() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return admin.credential.cert(parseServiceAccount());
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return admin.credential.applicationDefault();
  }

  return undefined;
}

export function initFirebaseAdmin() {
  if (admin.apps.length) {
    return admin.app();
  }

  const credential = getCredential();
  if (!credential) {
    throw new Error(
      'Firebase Admin credentials are required. Set FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.'
    );
  }

  return admin.initializeApp({
    credential,
    projectId: process.env.FIREBASE_PROJECT_ID || 'leanjust-website',
  });
}

export const firebaseAdmin = admin;
