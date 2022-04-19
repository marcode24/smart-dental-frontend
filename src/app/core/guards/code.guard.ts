import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CodeGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  anLoad(
    route: Route,
    segments: import('@angular/router').UrlSegment[]): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    const code = this.authService.code;
    if(code.length === 0) {
      return this.router.navigate(['/code']);
    }
    return this.authService.validateCode(code).pipe(tap(isValidCode => {
      if(!isValidCode) {
        this.router.navigate(['/code']);
      }
    }));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const code = this.authService.code;
    if(code.length === 0) {
      return this.router.navigate(['/code']);
    }
    return this.authService.validateCode(code).pipe(tap(isValidCode => {
      if(!isValidCode) {
        this.router.navigate(['/code']);
      }
    }));
  }
}
