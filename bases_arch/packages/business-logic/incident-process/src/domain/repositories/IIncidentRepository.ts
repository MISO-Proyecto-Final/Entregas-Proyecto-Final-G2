import { Incident } from '../entities/incident.entity';
import { Observable } from 'rxjs';

export interface IIncidentRepository {
  save(incident: Incident): Observable<Incident>;
}
