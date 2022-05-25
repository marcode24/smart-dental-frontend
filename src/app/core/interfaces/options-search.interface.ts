export interface IOptionsSearch {
  limit: number,
  offset: number,
  fullname?: string,
}

export interface ISearchParamsStatistics {
  limit: number;
  offset: number;
  type: string;
  option: string;
}