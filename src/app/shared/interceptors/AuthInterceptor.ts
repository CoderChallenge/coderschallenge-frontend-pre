import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import { environment } from '@src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService, private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const { token} = this.auth;
      if (req.url.indexOf(environment.BASE_URL) === 0 && token){
        req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
      }
      return next.handle(req).pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                  this.router.navigate(['/auth/login']);
              } else {
                  return throwError(error);
              }
          })
      );
    }

}


