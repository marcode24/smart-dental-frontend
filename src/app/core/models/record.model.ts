import { Service } from "./service.model";

export class Record {
  constructor(
    public id_record: number,
    public service_name: string,
    public quantity: number,
    public price: number,
    public status: string,
    public realization_date?: Date,
    public realization_time?: string,
    public service?: Service,
    public completed_date?: Date,
    public completed_time?: string,
    public payment_date?: Date,
    public payment_time?: string,
    public cancel_date?: Date,
    public cancel_time?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public id_service?: number,
    public id_patient?: number,
    public total?: number,
    public selected?: boolean,
  ) {}
}