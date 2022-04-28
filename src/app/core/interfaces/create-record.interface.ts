export interface ICreateRecord {
  id_service: number;
  id_patient: number;
  quantity?: number;
  realization_date?: Date;
  tooth_number?: number;
  vestibular?: boolean;
  ligual?: boolean;
  mesial?: boolean;
  distal?: boolean;
  oclusal?: boolean;
}