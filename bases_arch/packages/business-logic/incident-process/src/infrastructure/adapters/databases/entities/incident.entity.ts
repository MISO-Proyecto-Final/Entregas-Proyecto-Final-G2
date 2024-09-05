import { CustomerEntity } from './customer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('incident')
export class IncidentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Identificador único del incidente

  @Column()
  title: string; // Título del incidente
  @Column()
  description: string; // Descripción del incidente

  @ManyToOne(() => CustomerEntity, (customer) => customer.incident)
  customerFinalUser: CustomerEntity;
}
