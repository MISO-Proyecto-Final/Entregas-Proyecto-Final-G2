import { IncidentEntity } from '../entities/incident.entity';
import { Incident } from '../../../../domain/entities/incident.entity';
import { customerMapper } from './customer.mapper';

export function incidentMapper(incidentEntity: IncidentEntity) {
  return new Incident(
    incidentEntity.id,
    incidentEntity.title,
    incidentEntity.description,
    customerMapper(incidentEntity.customerFinalUser),
  );
}
