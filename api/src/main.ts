import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  try {
    console.log('Creating app...');
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    console.log('App created, registering CORS...');
    await app.register(fastifyCors, {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const port = Number(process.env.PORT ?? 8081);
    await app.listen(port, '0.0.0.0');
    console.log(`App running on port ${port}`);
  } catch (err) {
    console.error('Bootstrap error:', err);
    process.exit(1);
  }
}

bootstrap();
