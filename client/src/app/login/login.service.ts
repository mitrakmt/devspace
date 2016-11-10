import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {

  constructor(private _http: Http) { }

  login(): Observable<any> {
    return this._http.get('/github')
      // .map((res:Response) => res.json())
  }

}