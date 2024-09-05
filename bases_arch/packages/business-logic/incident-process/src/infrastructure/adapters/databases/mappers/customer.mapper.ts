import { CustomerEntity } from '../entities/customer.entity';
import { Customer } from '../../../../domain/entities/customer.entity';

export function customerMapper(customerEntity: CustomerEntity) {
  return new Customer(
    customerEntity.name,
    customerEntity.document,
    customerEntity.email,
    customerEntity.cellphone,
  );
}
