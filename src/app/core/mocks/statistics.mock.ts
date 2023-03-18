import { faker } from "@faker-js/faker";

import { IStatistics, IStatisticsDays } from "@interfaces/statistics.interface";

export const getMockStatistic = (): IStatistics => ({
  total_service: faker.datatype.number(),
  id_service: faker.datatype.number(),
  name: faker.datatype.string(),
  total: faker.datatype.number(),
  statistics: getMockStatisticsDays(2),
});

export const getMockStatistics = (size: number): IStatistics[] => {
  return Array(size)
    .fill(0)
    .map(() => getMockStatistic());
};

const getMockStatisticsDay = (): IStatisticsDays => ({
  total: faker.datatype.number(),
  total_quantity: faker.datatype.number(),
  id_service: faker.datatype.number(),
  realization_date: faker.date.past(10),
});

const getMockStatisticsDays = (size: number): IStatisticsDays[] => {
  return Array(size)
    .fill(0)
    .map(() => getMockStatisticsDay());
};
