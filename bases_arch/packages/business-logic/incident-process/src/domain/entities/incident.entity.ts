import { Customer } from './customer.entity';

export class Incident {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public customer: Customer,
  ) {}
}
