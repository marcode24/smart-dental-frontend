import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.cookieService.get('token');
    let request = req;
    if(token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    console.log('paso por interceptor');
    return next.handle(request);
  }

}
