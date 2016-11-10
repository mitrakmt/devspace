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
    sendNewsfeedUpdate(post: any): Observable<any> {
      let username = post._value.username;
      let content = post._value.content;
      let body = {'content': content};
      let headers = new Headers({'userid': 1});
      headers.append('Content-Type', 'application/json');
      return this._http.post('/api/posts', body, {
        headers: headers
      })
        .map((data) => data.json())
    }
}
