import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/settings/profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent
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
export class SettingsRoutingModule {}
