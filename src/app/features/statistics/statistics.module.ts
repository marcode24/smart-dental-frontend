import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './components/components.module';

import { StatisticsComponent } from './pages/statistics/statistics.component';

import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { PaginationsModule } from '@components/paginations/paginations.module';
import { LoadersModule } from '@components/loaders/loaders.module';

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
