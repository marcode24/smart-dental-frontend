import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "@guards/auth.guard";

import { FeaturesComponent } from "./features.component";

const routes: Routes = [
  {
    path: 'home',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./home/home.routing').then(m => m.HomeRoutingModule),
  },
  {
    path: 'users',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./users/users.routing').then(m => m.UsersRoutingModule),
  },
  {
    path: 'services',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./services-offer/services-offer.routing').then(m => m.ServicesOfferRoutingModule),
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
