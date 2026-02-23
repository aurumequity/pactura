import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'
import { FirebaseService } from '../../services/firebase.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private firebaseService: FirebaseService) {}

async use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header')
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = await this.firebaseService.verifyToken(token)
      req['user'] = { userId: decoded.uid }
      next()
    } catch (err) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}