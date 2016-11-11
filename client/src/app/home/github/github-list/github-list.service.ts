import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class GithubListService {

  constructor(private _http: Http) { }

  fetchGithubUpdates(): Observable<any> {
    let username = localStorage.getItem('username')
    let headers = new Headers({ 'username': username })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/home/github', options)
      .map((res:Response) => res.json())
  }

}
