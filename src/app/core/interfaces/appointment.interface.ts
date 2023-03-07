export class IChangeStatus {
  id_appointment: number;
  status: 'DONE' | 'CANCELLED';
}

export class ICreateAppointment {
  id_patient: number;
  date: string;
  time: string;
  id_record?: number[];
  description?: string;
  id_user?: number;
}
