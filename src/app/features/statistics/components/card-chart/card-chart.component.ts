import { Component, Input, OnInit } from '@angular/core';

import { IStatistics } from '@interfaces/statistics.interface';

@Component({
  selector: 'app-card-chart',
  templateUrl: './card-chart.component.html',
  styles: [
  ]
})
export class CardChartComponent implements OnInit {

  @Input() statistic: IStatistics;

  public totals: number[] = [];

  ngOnInit(): void {
    this.statistic.statistics?.forEach(el => this.totals.push(Number(el.total_quantity)));
  }

}
