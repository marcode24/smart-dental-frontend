import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}
  canLoad(route: Route, segments: import('@angular/router').UrlSegment[]): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    return this.userService.validateToken().pipe(tap(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigateByUrl('/login');
      }
    }));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userService.validateToken().pipe(tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/login');
        }
      }));
  }
}
