import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import { PipesModule } from '@pipes/pipes.module';

import { ApexChartComponent } from './apex-chart/apex-chart.component';
import { CardChartComponent } from './card-chart/card-chart.component';
import { TableRecordsComponent } from './table-records/table-records.component';

@NgModule({
  declarations: [
    ApexChartComponent,
    CardChartComponent,
    TableRecordsComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    PipesModule
  ],
  exports: [
    CardChartComponent,
    TableRecordsComponent
  ]
})
export class ComponentsModule { }
