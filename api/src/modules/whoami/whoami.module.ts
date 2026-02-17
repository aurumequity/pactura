import { Module } from '@nestjs/common'
import { WhoAmIController } from './whoami.controller'

@Module({
  controllers: [WhoAmIController],
})
export class WhoAmIModule {}