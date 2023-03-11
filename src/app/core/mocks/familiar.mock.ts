import { faker } from "@faker-js/faker";

import { Familiar } from "@models/familiar.model";

export const getMockFamiliar = (): Familiar => ({
  familiar_name: faker.datatype.string(),
  familiar_last_name: faker.datatype.string(),
  familiar_gender: faker.datatype.string(),
  relationship: faker.datatype.string(),
  familiar_email: faker.datatype.string(),
  familiar_phone_number: faker.datatype.number(),
  id_familiar: faker.datatype.number(),
});
