import { Injectable } from '@nestjs/common';
import { IIncidentRepository } from '../../../../../domain/repositories/IIncidentRepository';
import { Incident } from '../../../../../domain/entities/incident.entity';
import { from, map, Observable, switchMap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { IncidentEntity } from '../../entities/incident.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../../entities/customer.entity';
import { incidentMapper } from '../../mappers/incident.mapper';

@Injectable()
export class IncidentRepositoryService implements IIncidentRepository {
  constructor(
    @InjectRepository(IncidentEntity)
    private readonly incidentRepository: Repository<IncidentEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  save(incident: Incident): Observable<Incident> {
    const customerEntity = new CustomerEntity();
    customerEntity.name = incident.customer.name;
    customerEntity.email = incident.customer.email;
    customerEntity.document = incident.customer.document;
    customerEntity.cellphone = incident.customer.cellphone;

    return from(this.customerRepository.save(customerEntity))
      .pipe(
        switchMap((customerEntity) => {
          const incidentEntity = new IncidentEntity();
          incidentEntity.title = incident.title;
          incidentEntity.description = incident.description;
          incidentEntity.customerFinalUser = customerEntity;
          return this.incidentRepository.save(incidentEntity);
        }),
      )
      .pipe(map((incidentEntity) => incidentMapper(incidentEntity)));
  }
}
