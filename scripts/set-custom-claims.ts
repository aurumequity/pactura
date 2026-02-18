import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

// 1. Setup paths
const serviceAccountPath = join(process.cwd(), 'service-account.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

// 2. Initialize directly without checking .length
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (e) {
  // If it's already initialized, just move on
}

async function setTenantClaim(uid: string, orgId: string) {
  try {
    // 3. Use the global admin object directly
    await admin.auth().setCustomUserClaims(uid, {
      orgId: orgId,
      role: 'ADMIN',
    });
    console.log(`✅ Success! User ${uid} now belongs to Org: ${orgId}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting claims:', error);
    process.exit(1);
  }
}

// Ensure these match your actual data
const TEST_USER_UID = 'rDibee1aYLSX5aabbSnIY3QnJVo1'; 
const SAMPLE_ORG_ID = 'aurum-equity-test-001';

setTenantClaim(TEST_USER_UID, SAMPLE_ORG_ID);