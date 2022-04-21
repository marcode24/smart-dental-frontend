import { User } from "@models/user.model";

export class IResponseUser {
  users: User[];
  totalAdmin: number;
  totalUser: number;
}