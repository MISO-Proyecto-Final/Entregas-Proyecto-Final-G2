import { Module } from '@nestjs/common';
import { IncidentController } from './incident.controller';
import { IncidentRepositoryService } from '../../adapters/databases/repositories/incident-repository/incident-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentEntity } from '../../adapters/databases/entities/incident.entity';
import { CustomerEntity } from '../../adapters/databases/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncidentEntity, CustomerEntity])],
  providers: [IncidentRepositoryService],
  controllers: [IncidentController],
})
export class IncidentModule {}
