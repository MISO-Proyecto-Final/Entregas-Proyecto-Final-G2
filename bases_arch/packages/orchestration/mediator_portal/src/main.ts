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
        package: 'orchestration.mediator_portal',
        protoPath: [
          __dirname +
            '/infraestructure/entry_points/protos/orchestration.mediator_portal.proto',
        ],
      },
    },
  );

  await app.listen();
}
bootstrap();
