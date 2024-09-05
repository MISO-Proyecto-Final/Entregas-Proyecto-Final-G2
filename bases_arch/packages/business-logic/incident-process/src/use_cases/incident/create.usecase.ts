import { Observable } from 'rxjs';
import { IIncidentRepository } from '../../domain/repositories/IIncidentRepository';
import { Incident } from '../../domain/entities/incident.entity';

export class CreateIncidentUseCase {
  constructor(private incidentRepository: IIncidentRepository) {}

  execute(incident: Incident): Observable<Incident> {
    return this.incidentRepository.save(incident);
  }
}
