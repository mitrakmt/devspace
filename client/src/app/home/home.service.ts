import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class HomeService {

  constructor(private _http: Http) { }

  test(): Observable<any> {
    let headers = new Headers({ 'userid': '1' })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/', options)
      .map((res:Response) => res)
  }

}
