import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { LoadersModule } from '@components/loaders/loaders.module';
import { PaginationsModule } from '@components/paginations/paginations.module';

import { ComponentsModule } from './components/components.module';
import { StatisticsComponent } from './pages/statistics/statistics.component';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DropdownsModule,
    PaginationsModule,
    LoadersModule
  ]
})
export class StatisticsModule { }
