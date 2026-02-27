import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

export interface OrgResult {
  id: string;
  name: string;
  slug: string | null;
  plan: string | null;
  role: string;
}

@Injectable()
export class OrgsService {
  private db = admin.firestore();

  async getOrgsForUser(uid: string): Promise<OrgResult[]> {
    const orgsSnap = await this.db.collection('orgs').get();
    if (orgsSnap.empty) return [];

    const results: OrgResult[] = [];

    for (const orgDoc of orgsSnap.docs) {
      const memberSnap = await this.db
        .collection('orgs')
        .doc(orgDoc.id)
        .collection('memberships')
        .doc(uid)
        .get();

      if (memberSnap.exists && memberSnap.data()?.status === 'active') {
        const data = orgDoc.data();
        results.push({
          id: orgDoc.id,
          name: data.name,
          slug: data.slug ?? null,
          plan: data.plan ?? null,
          role: memberSnap.data()?.role ?? 'member',
        });
      }
    }

    return results;
  }
}
