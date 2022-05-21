import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "@guards/admin.guard";
import { ServicesOfferComponent } from "./pages/services-offer/services-offer.component";

const childRoutes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: ServicesOfferComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ServicesOfferRoutingModule {}
