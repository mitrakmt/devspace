import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class HomeService {

  constructor(private router: Router, private _http: Http) { }

  convertCookieToToken(): Promise <any> {
    if (localStorage.getItem('token')) {
      return
    }
    
    let found = false;
    let splitCookie = document.cookie.split(';')
    splitCookie.forEach(cookie => {
      if (cookie.indexOf('token') !== -1) {
        found = true;
        localStorage.setItem("token", cookie.slice(7));
      } else if (cookie.indexOf('userid') !== -1) {
        localStorage.setItem("userid", cookie.slice(7));
      } else if (cookie.indexOf('username') !== -1) {
        localStorage.setItem('username', cookie.slice(10));
      } else if (cookie.indexOf('firstname') !== -1) {
        localStorage.setItem('firstname', cookie.slice(11));
      } else if (cookie.indexOf('lastname') !== -1) {
        localStorage.setItem('lastname', cookie.slice(10));
      } 
    })

    if (!found) {
      this.router.navigate(['/login']);
    } 
    
    if (localStorage.getItem('username')) {
      let username = localStorage.getItem('username')
      let headers = new Headers({ 'username': username })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/users/avatar', options)
        .toPromise()
        .then(data => {
          localStorage.setItem('imageUrl', data['_body'])
        })
    }

  }

}
