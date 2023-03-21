import { faker } from "@faker-js/faker";

import { Service } from "@models/service.model";

export const getMockService = (): Service => ({
  name: faker.datatype.string(),
  description: faker.datatype.string(),
  price: faker.datatype.number(),
  status: faker.datatype.boolean(),
  odontogram: faker.datatype.boolean(),
  color: faker.datatype.string(),
  id_service: faker.datatype.number(),
});

export const getMockServices = (size: number): Service[] => {
  return Array(size)
    .fill(0)
    .map(() => getMockService());
};
