import { faker } from "@faker-js/faker";

import { User } from "@models/user.model";

export const getMockUser = (): User => ({
  city: faker.datatype.string(),
  country: faker.datatype.string(),
  cp: faker.datatype.number(),
  date_birth: faker.date.birthdate(),
  email: faker.datatype.string(),
  gender: faker.datatype.string(),
  last_name: faker.datatype.string(),
  name: faker.datatype.string(),
  phone_number: faker.datatype.number(),
  role: faker.datatype.string(),
  status: faker.datatype.boolean(),
  street: faker.datatype.string(),
  createdAt: faker.date.past(10),
  username: faker.datatype.string(),
  updatedAt: faker.date.past(10),
  id_user: faker.datatype.number(),
  password: faker.datatype.string(),
  image: faker.datatype.string(),
  code: faker.datatype.string(),
});

export const getMockUsers = (size: number): User[] => {
  return Array(size).fill(0).map(() => getMockUser());
};
