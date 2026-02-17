import 'dotenv/config'
console.log('AUTH EMULATOR', process.env.FIREBASE_AUTH_EMULATOR_HOST)
console.log('PROJECT', process.env.FIREBASE_PROJECT_ID)

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

console.log("AUTH EMULATOR", process.env.FIREBASE_AUTH_EMULATOR_HOST);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  const port = Number(process.env.PORT ?? 8081)
  await app.listen(port, '0.0.0.0')
}
bootstrap()