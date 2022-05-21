import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IStatisticsDays } from '@interfaces/statistics.interface';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  fill: ApexFill;
  tooltip: ApexTooltip,
  colors: any[];
};

import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-apex-chart',
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.css']
})
export class ApexChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() statistics: IStatisticsDays[] = [];
  @Input() data: number[]

  public readyToShow: boolean = false;

  constructor() {
  }
  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "Total Users",
          data: this.data,
        },
      ],
      chart: {
        type: "area",
        height: 65,
        toolbar: {
          show: !1,
        },
        zoom: {
          enabled: !1,
        },
        dropShadow: {
          enabled: !0,
          top: 3,
          left: 14,
          blur: 4,
          opacity: 0.12,
          color: "#17a00e",
        },
        sparkline: {
          enabled: !0,
        },
      },
      markers: {
        size: 0,
        colors: ["#17a00e"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      plotOptions: {
        bar: {
          horizontal: !1,
          columnWidth: "45%",
        },
      },
      dataLabels: {
        enabled: !1,
      },
      stroke: {
        show: !0,
        width: 2.4,
        curve: "smooth",
      },
      colors: ["#17a00e"],
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: "dark",
        fixed: {
          enabled: !1,
        },
        x: {
          show: !1,
        },
        y: {
          title: {
            formatter: function (e: any) {
              return '';
            },
          },
        },
        marker: {
          show: !1,
        },
      },
    };
    this.readyToShow = true;
  }

}
