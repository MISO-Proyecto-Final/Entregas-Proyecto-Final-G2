import { Module } from '@nestjs/common';
import { PortalController } from './portal.controller';
import { PortalMediatorAuthService } from 'src/infraestructure/adaptors/portal_mediator/portal_mediator_auth.service';

@Module({
  controllers: [PortalController],
  providers: [PortalMediatorAuthService],
})
export class PortalModule {}
