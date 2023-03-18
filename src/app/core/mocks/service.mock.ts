import { faker } from "@faker-js/faker";

import { Service } from "@models/service.model";

export const getMockService = (): Service => ({
  name: faker.datatype.string(),
  description: faker.datatype.string(),
  price: faker.datatype.number(),
  status: faker.datatype.string(),
  odontogram: faker.datatype.string(),
  color: faker.datatype.string(),
  id_service: faker.datatype.number(),
});
