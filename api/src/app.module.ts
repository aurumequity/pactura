import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common'
import { FirebaseService } from './services/firebase.service'
import { AuthMiddleware } from './common/middleware/auth.middleware'
import { HealthController } from './health.controller'

@Module({
  controllers: [HealthController],
  providers: [FirebaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'health', method: RequestMethod.GET },
        { path: 'ops/retentionSweep', method: RequestMethod.POST }
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}