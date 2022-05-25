import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "@guards/admin.guard";

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
  },
  {
    path: 'patients',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./patients/patients.routing').then(m => m.PatientsRoutingModule),
  },
  {
    path: 'appointments',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./appointments/appointments.routing').then(m => m.AppointmentsRoutingModule),
  },
  {
    path: 'settings',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./settings/settings.routing').then(m => m.SettingsRoutingModule),
  },
  {
    path: 'statistics',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./statistics/statistics.routing').then(m => m.StatisticsRoutingModule),
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
