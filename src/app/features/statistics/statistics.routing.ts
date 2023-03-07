import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminGuard } from "@guards/admin.guard";

import { StatisticsComponent } from "./pages/statistics/statistics.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: StatisticsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class StatisticsRoutingModule {}
