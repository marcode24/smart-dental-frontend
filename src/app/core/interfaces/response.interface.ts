import { Service } from "@models/service.model";
import { User } from "@models/user.model";

export interface IResponseUser {
  users: User[];
  totalAdmin: number;
  totalUser: number;
}

export interface IResponseService {
  services: Service[];
  totalActive: number;
  totalInactive: number;
}