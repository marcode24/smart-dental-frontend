import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { PatientService } from '@services/patient.service';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {

  constructor(
    private readonly patientService: PatientService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const patientID = route.params['patientID'];
      return this.patientService.getPatientByUser(patientID)
        .pipe(tap((hasAccess: boolean) => {
          if(!hasAccess) {
            this.router.navigate(['/patients']);
          }
      }));
  }
}
