import { Module } from '@nestjs/common';
import { IncidentRepositoryService } from './repositories/incident-repository/incident-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentEntity } from './entities/incident.entity';
import { CustomerEntity } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncidentEntity, CustomerEntity])],
  providers: [IncidentRepositoryService],
  exports: [IncidentRepositoryService],
})
export class DatabasesModule {}
