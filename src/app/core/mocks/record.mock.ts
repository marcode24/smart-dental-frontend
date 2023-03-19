import { faker } from '@faker-js/faker';

import { Record } from '@models/record.model';

import { getMockService } from './service.mock';

export const getMockRecord = (): Record => ({
  id_record: faker.datatype.number(),
  service_name: faker.datatype.string(),
  quantity: faker.datatype.number(),
  price: faker.datatype.number(),
  status: faker.datatype.string(),
  realization_date: faker.date.past(10),
  realization_time: faker.datatype.string(),
  service: getMockService(),
  completed_date: faker.date.past(10),
  completed_time: faker.datatype.string(),
  payment_date: faker.date.past(10),
  payment_time: faker.datatype.string(),
  cancel_date: faker.date.past(10),
  cancel_time: faker.datatype.string(),
  createdAt: faker.date.past(10),
  updatedAt: faker.date.past(10),
  id_service: faker.datatype.number(),
  id_patient: faker.datatype.number(),
  total: faker.datatype.number(),
  selected: faker.datatype.boolean(),
});

export const getMockRecords = (size: number): Record[] => {
  return Array(size)
    .fill(0)
    .map(() => getMockRecord());
};
