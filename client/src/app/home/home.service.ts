import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class HomeService {

  constructor(private router: Router, private _http: Http) { }

  convertCookieToToken() {
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
      }
    })

    if (!found) {
      this.router.navigate(['/login']);
    } 
    
    if (localStorage.getItem('username')) {
      console.log('inside the if')
      console.log("SUP")
      let username = localStorage.getItem('username')
      console.log(username)
      let headers = new Headers({ 'username': username })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/users/avatar', options)
        .map((res: Response) => {
          console.log(res)
        })
    }

  }

}
