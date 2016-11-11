import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class HomeService {

  constructor(private router: Router) { 
  }

  convertCookieToToken(): void {
    let found = false;
    let splitCookie = document.cookie.split(';')
    splitCookie.forEach((cookie) => {
      if (cookie.indexOf('token') !== -1) {
        found = true;
        localStorage.setItem("token", cookie.slice(7));
      }
    })

    if (!found) {
      this.router.navigate(['/login']);
    } else {
      let jwtHelper: JwtHelper = new JwtHelper();
      let token = localStorage.getItem('token')
      let payload = jwtHelper.decodeToken(token)
      console.log(payload)
    }
  }

}
