export class Service {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public status: boolean,
    public odontogram: boolean,
    public color: string,
    public id_service?: number,
  ) {}
}
