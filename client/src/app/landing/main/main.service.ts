import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class MainService {

  constructor(private _http: Http) { }

    login(): Observable<any> {
      let headers = new Headers({ 'client_id': 'b83b7a6429ff48c6fd4e', 'redirect_uri': 'http://localhost:4200/api/auth/github/callback', 'allow_signup': 'false' })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('https://github.com/login/oauth/authorize', options)
        .map((res: Response) => {
          console.log("RES", res)
          return res.json();
        });
    }


}
