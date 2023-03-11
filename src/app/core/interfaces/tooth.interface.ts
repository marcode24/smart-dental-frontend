export interface IUpdateTooth {
  id_service: number;
  vestibular: boolean;
  ligual: boolean;
  mesial: boolean;
  distal: boolean;
  oclusal: boolean;
  tooth_number?: number;
}
