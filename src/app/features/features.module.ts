import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FeaturesComponent } from './features.component';

import { CoreModule } from '../core/core.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    HomeModule,
  ],
  providers: [
  ]
})
export class FeaturesModule { }
