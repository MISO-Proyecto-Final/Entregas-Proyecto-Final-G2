import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IncidentEntity } from './incident.entity';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // ID del cliente

  @Column()
  name: string; // Nombre del cliente

  @Column()
  document: string; // Documento del cliente

  @Column()
  cellphone: string; // Número telefónico del cliente

  @Column()
  email: string; // Correo electrónico del cliente

  @OneToMany(() => IncidentEntity, (incident) => incident.customerFinalUser)
  incident: IncidentEntity; // Información del usuario final
}
