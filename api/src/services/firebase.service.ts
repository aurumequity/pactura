import * as admin from 'firebase-admin'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FirebaseService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      })
    }
  }

  async verifyToken(idToken: string) {
    return admin.auth().verifyIdToken(idToken)
  }
}