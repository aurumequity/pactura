import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class OrgsService {
  private db = admin.firestore();

  async getOrgsForUser(uid: string) {
    const membershipsSnap = await this.db
      .collectionGroup('memberships')
      .where('uid', '==', uid)
      .where('status', '==', 'active')
      .get();

    if (membershipsSnap.empty) return [];

    const membershipsByOrgId = new Map<string, string>();
    for (const doc of membershipsSnap.docs) {
      const data = doc.data();
      membershipsByOrgId.set(data.orgId, data.role);
    }

    const orgRefs = [...membershipsByOrgId.keys()].map((orgId) =>
      this.db.collection('orgs').doc(orgId),
    );

    const orgSnaps = await this.db.getAll(...orgRefs);

    return orgSnaps
      .filter((snap) => snap.exists)
      .map((snap) => {
        const data = snap.data()!;
        return {
          id: snap.id,
          name: data.name,
          slug: data.slug,
          plan: data.plan,
          role: membershipsByOrgId.get(snap.id) ?? 'member',
        };
      });
  }
}
