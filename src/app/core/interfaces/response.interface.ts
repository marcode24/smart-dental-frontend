import { Appointment } from "@models/appointment.model";
import { Patient } from "@models/patient.model";
import { Service } from "@models/service.model";
import { User } from "@models/user.model";

export interface IResponseUsers {
  users: User[];
  totalAdmin: number;
  totalUser: number;
}

export interface IResponseService {
  services: Service[];
  totalActive: number;
  totalInactive: number;
}

export interface IResponsePatient {
  patients: Patient[];
  totalActive: number;
  totalInactive: number;
}

export interface IResponseUser {
  user: User;
  status?: number;
}

export interface IResponseAppointment {
  appointments: Appointment[];
  total: number;
}

export interface IResponseLogin {
  access_token: string,
  user: User;
}
