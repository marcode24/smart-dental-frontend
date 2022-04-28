import { Service } from "./service.model";

export class Record {
  constructor(
    public id_record: number,
    public service_name: string,
    public quantity: number,
    public price: number,
    public status: string,
    public realization_date: Date,
    public service?: Service,
    public completed_date?: Date,
    public payment_date?: Date,
    public cancel_date?: Date,
    public createdAt?: Date,
    public updatedAt?: Date,
    public id_service?: number,
    public id_patient?: number,
    public total?: number,
  ) {}
}