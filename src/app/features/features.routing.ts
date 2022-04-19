import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../core/guards/auth.guard";

import { FeaturesComponent } from "./features.component";

const routes: Routes = [
  {
    path: 'home',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./home/home.routing').then(m => m.HomeRoutingModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class FeaturesRoutingModule {}
