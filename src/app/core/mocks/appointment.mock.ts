import { faker } from '@faker-js/faker';

import { Appointment } from "@models/appointment.model";

import { getMockPatient } from './patient.mock';

export const getMockAppointment = (): Appointment => ({
  id_appointment: faker.datatype.number() ,
  id_patient: faker.datatype.number(),
  id_user: faker.datatype.number(),
  date: faker.date.future(10),
  time: faker.datatype.string(),
  status: faker.datatype.string(),
  description: faker.datatype.string(),
  createdAt: faker.date.future(10),
  updatedAt: faker.date.future(10),
  records: [],
  patient: getMockPatient(),
});

export const getMockAppointments = (size = 5): Appointment[] => {
  const appointments: Appointment[] = [];
  for (let i = 0; i < size; i++) {
    appointments.push(getMockAppointment());
  }
  return [...appointments];
};
