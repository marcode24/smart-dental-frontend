import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AlertsModule } from '@components/alerts/alerts.module';
import { DropdownsModule } from '@components/dropdowns/dropdowns.module';
import { LoadersModule } from '@components/loaders/loaders.module';
import { ModalsModule } from '@components/modals/modals.module';
import { PaginationsModule } from '@components/paginations/paginations.module';
import { TablesModule } from '@components/tables/tables.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DropdownsModule,
    AlertsModule,
    TablesModule,
    PaginationsModule,
    ModalsModule,
    LoadersModule,
    RouterModule
  ]
})
export class HomeModule { }
