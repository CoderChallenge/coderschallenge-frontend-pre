import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import { routes } from '@app/shared';
import { environment } from '@src/environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const { token} = this.auth;
      if (req.url.indexOf(environment.BASE_URL) === 0 && token){
        req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
      }
      return next.handle(req);
    }

}


