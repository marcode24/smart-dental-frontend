import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CodeComponent } from "./pages/code/code.component";
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
  },
  {
    path: 'code',
    component: CodeComponent
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
