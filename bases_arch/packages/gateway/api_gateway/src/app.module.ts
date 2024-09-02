import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortalModule } from './infraestructure/entry_points/portal/portal.module';
import { PortalMediatorAuthService } from './infraestructure/adaptors/portal_mediator/portal_mediator_auth.service';
@Module({
  imports: [PortalModule],
  controllers: [AppController],
  providers: [AppService, PortalMediatorAuthService],
})
export class AppModule {}
