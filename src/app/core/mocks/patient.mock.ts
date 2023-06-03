import { faker } from "@faker-js/faker";

import { Patient } from "@models/patient.model";

import { getMockFamiliar } from "./familiar.mock";
import { getMockUser } from "./user.mock";

export const getMockPatient = (): Patient => ({
  name: faker.datatype.string(),
  last_name: faker.datatype.string(),
  birth_date: faker.date.birthdate(),
  gender: faker.datatype.string(),
  email: faker.datatype.string(),
  phone_number: faker.datatype.number(),
  street: faker.datatype.string(),
  number: faker.datatype.number(),
  cp: faker.datatype.number(),
  city: faker.datatype.string(),
  country: faker.datatype.string(),
  status: faker.datatype.boolean(),
  familiar: getMockFamiliar(),
  user: getMockUser(),
  image: faker.datatype.string(),
  id_patient: faker.datatype.number(),
  id_familiar: faker.datatype.number(),
  id_user: faker.datatype.number(),
});

export const getMockPatients = (size: number): Patient[] => {
  const patients: Patient[] = [];
  for (let i = 0; i < size; i++) {
    patients.push(getMockPatient());
  }
  return patients;
};
