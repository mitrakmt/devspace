import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class NewsfeedListService {

  constructor(private _http: Http) { }

    fetchNewsfeedUpdates(): Observable<any> {
    let headers = new Headers({ 'userid': 1 })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/home/feed', options)
      .map((res:Response) => res.json())
  }

}
