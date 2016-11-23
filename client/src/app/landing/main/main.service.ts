import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class MainService {

  constructor(private _http: Http) { }

    login(): Observable<any> {
      return this._http.get('/api/users/login')
        .map((res: Response) => {
          return res.json();
        });
    }


}
