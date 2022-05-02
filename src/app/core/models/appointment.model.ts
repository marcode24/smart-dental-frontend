import { Patient } from "./patient.model";
import { Record } from "./record.model";

export class Appointment {
  constructor(
    public id_patient: number,
    public id_user: number,
    public date: Date,
    public status: string,
    public description?: string,
    public id_appointment?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public records?: Record[],
    public patient?: Patient,
  ) {}
}