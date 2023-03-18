import { faker } from "@faker-js/faker";

import { Tooth } from "@models/tooth.model";

import { getMockRecord } from "./record.mock";

export const getMockTooth = (): Tooth => ({
  tooth_number: faker.datatype.number(),
  distal: faker.datatype.boolean(),
  ligual: faker.datatype.boolean(),
  mesial: faker.datatype.boolean(),
  oclusal: faker.datatype.boolean(),
  vestibular: faker.datatype.boolean(),
  id_patient: faker.datatype.number(),
  id_record: faker.datatype.number(),
  record: getMockRecord(),
  color: faker.datatype.string(),
  id_tooth: faker.datatype.number(),
  id_service: faker.datatype.number(),
});

export const getMockTeeth = (size = 10): Tooth[] => {
  return Array(size)
    .fill(0)
    .map(() => getMockTooth());
};
