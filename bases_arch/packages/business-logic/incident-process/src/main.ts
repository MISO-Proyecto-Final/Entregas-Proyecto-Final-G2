import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log('Starting microservice...');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5002',
        package: 'business_logic.incident',
        protoPath: [
          __dirname +
            '/infrastructure/entry_points/protos/business_logic.incident.proto',
        ],
      },
    },
  );

  await app.listen();
}

bootstrap();
