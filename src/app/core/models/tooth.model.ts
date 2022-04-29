import { Record } from "./record.model";

export class Tooth {
  constructor(
    public tooth_number: number,
    public distal?:  boolean,
    public ligual?: boolean,
    public mesial?:  boolean,
    public oclusal?:   boolean,
    public vestibular?: boolean,
    public id_patient?: number,
    public id_record?: number,
    public record?: Record,
    public color?: string,
    public id_tooth?: number,
    public id_service?: number,
  ) {}
}