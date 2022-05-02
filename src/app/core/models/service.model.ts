export class Service {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public status: string,
    public odontogram: string,
    public color: string,
    public id_service?: number,
  ){}
}