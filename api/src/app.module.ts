import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common'
import { FirebaseService } from './services/firebase.service'
import { AuthMiddleware } from './common/middleware/auth.middleware'
import { HealthController } from './health.controller'
import { WhoAmIModule } from './modules/whoami/whoami.module'
import { OrgsModule } from '../api/src/modules/orgs/orgs.module'

@Module({
  controllers: [HealthController],
  providers: [FirebaseService],
  imports: [WhoAmIModule, OrgsModule],
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