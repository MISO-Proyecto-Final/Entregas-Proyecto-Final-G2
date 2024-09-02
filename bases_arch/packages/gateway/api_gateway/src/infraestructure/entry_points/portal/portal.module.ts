import { Module } from '@nestjs/common';
import { PortalController } from './portal.controller';
import { PortalMediatorAuthService } from 'src/infraestructure/adaptors/portal_mediator/portal_mediator_auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PORTAL_PACKAGE', // Este es el token que usaremos para inyectar el cliente gRPC
        transport: Transport.GRPC,
        options: {
          package: 'orchestration.mediator_portal', // El paquete definido en tu archivo .proto
          protoPath: join(
            __dirname,
            '../../adaptors/portal_mediator/orchestration.mediator_portal.proto',
          ), // Ruta a tu archivo .proto
          url: 'localhost:5000', // URL y puerto donde tu servidor gRPC está escuchando
        },
      },
    ]),
  ],
  controllers: [PortalController],
  providers: [PortalMediatorAuthService],
})
export class PortalModule {}
