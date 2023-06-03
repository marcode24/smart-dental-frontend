import { Familiar } from "./familiar.model";
import { User } from "./user.model";

export class Patient {
  constructor(
    public name: string,
    public last_name: string,
    public birth_date: Date,
    public gender: string,
    public email: string,
    public phone_number: number,
    public street: string,
    public number: number,
    public cp: number,
    public city: string,
    public country: string,
    public status: boolean,
    public familiar: Familiar,
    public user?: User,
    public image?: string,
    public id_patient?: number,
    public id_familiar?: number,
    public id_user?: number,
  ) {}
}
