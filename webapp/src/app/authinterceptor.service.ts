import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable()
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    var userEmail = localStorage.getItem('currentUserEmail');
    var auth = this.injector.get(AuthService);
    if (userEmail === undefined || userEmail == null) {
      userEmail = '';
    }
    if (req.method == 'POST' && req.body != null) {
      let miliseconds = Date.now();
      let date: any = new Date(miliseconds);
      date = date.toString();
      req.body['modifiedBy'] = userEmail;
      req.body['modifiedDate'] = date;
    }
    var authRequest = req.clone({
      headers: new HttpHeaders({
        'currentUserEmail': userEmail,
        'Authorization': 'token ' + auth.token
      })
    });
    return next.handle(authRequest);
  }
}
