import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'app/core/pipes/pipes.module';

import { NgApexchartsModule } from 'ng-apexcharts';

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
