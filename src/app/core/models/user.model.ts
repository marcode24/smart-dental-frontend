export class User {
  constructor(
    public city: string,
    public country: string,
    public cp: number,
    public date_birth: Date,
    public email: string,
    public gender: string,
    public last_name: string,
    public name: string,
    public phone_number: number,
    public role: string,
    public status: boolean,
    public street: string,
    public createdAt?: Date,
    public username?: string,
    public updatedAt?: Date,
    public id_user?: number,
    public password?: string,
    public image?: string,
    public code?: string,
  ) {}
}