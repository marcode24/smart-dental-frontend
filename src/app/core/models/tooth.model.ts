import { Record } from "./record.model";

export class Tooth {
  constructor(
    public distal: false,
    public ligual: true,
    public mesial: false,
    public oclusal: false,
    public tooth_number: number,
    public vestibular: true,
    public id_patient?: number,
    public id_record?: number,
    public record?: Record,
    public id_tooth?: number,
  ) {}
}