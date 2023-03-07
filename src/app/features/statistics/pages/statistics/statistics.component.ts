import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs';

import { RecordService } from '@services/record.service';

import { Record } from '@models/record.model';

import { ISearchParamsStatistics } from '@interfaces/options-search.interface';
import { IStatistics, IStatisticsByDate } from '@interfaces/statistics.interface';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit {

  public statistics: IStatistics[];
  public statisticsDate: Record[];
  public totalRecords = 0;
  public earnings = 0;

  public isLoadingPage = true;

  private statisticsDateParams: ISearchParamsStatistics = {
    limit: 5,
    offset: 0,
    type: 'month',
    option: 'current'
  };

  constructor(
    private recordService: RecordService
  ) {}

  ngOnInit(): void {
    forkJoin({
      statistics: this.recordService.getStatistics(),
      statisticsDate: this.recordService.getStatisticsByDate(this.statisticsDateParams)
    }).subscribe(({ statistics, statisticsDate }) => {
      this.statistics = statistics;
      this.setDataStatisticsDate(statisticsDate);
      this.isLoadingPage = false;
    });
  }

  setDataStatisticsDate(data: IStatisticsByDate) {
    const { earnings, records, total } = data;
    this.statisticsDate = records;
    this.totalRecords = total;
    this.earnings = earnings[0].total;
  }

  getStatisticsByDate() {
    this.recordService.getStatisticsByDate(this.statisticsDateParams).subscribe(resp => {
      this.setDataStatisticsDate(resp);
    });
  }

  get getLimitPagination(): number {
    return this.statisticsDateParams.limit;
  }

  changePage(value: number): void {
    this.statisticsDateParams.offset = value;
    this.getStatisticsByDate();
  }

  changeLimit(value: number): void {
    this.statisticsDateParams.limit = value;
    this.statisticsDateParams.offset = 0;
    this.getStatisticsByDate();
  }

  changeType(value: string): void {
    this.statisticsDateParams.offset = 0;
    this.statisticsDateParams.type = value;
    this.getStatisticsByDate();
  }

  changeOption(value: string): void {
    this.statisticsDateParams.offset = 0;
    this.statisticsDateParams.option = value;
    this.getStatisticsByDate();
  }

}
