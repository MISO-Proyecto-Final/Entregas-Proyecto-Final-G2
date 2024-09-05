import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Incident } from '../../../domain/entities/incident.entity';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { IncidentRepositoryService } from '../../adapters/databases/repositories/incident-repository/incident-repository.service';
import { CreateIncidentUseCase } from '../../../use_cases/incident/create.usecase';

@Controller('incident')
export class IncidentController {
  constructor(private incidentRepository: IncidentRepositoryService) {}

  @GrpcMethod('IncidentService', 'CreateIncident')
  public createIncident(
    incident: Incident,
    metadata: Metadata,
    call: ServerUnaryCall<Incident, Incident>,
  ) {
    const createIncidentUseCase = new CreateIncidentUseCase(
      this.incidentRepository,
    );

    return createIncidentUseCase.execute(incident);
  }
}
