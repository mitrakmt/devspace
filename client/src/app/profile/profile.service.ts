import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class ProfileService {

  constructor(private _http: Http) {  }

    // fetchUserInfo(): Observable<any> {
    //   let username = localStorage.getItem('username')
    //   let username = localStorage.getItem('userid')
    //   let headers = new Headers({ 'username': username, 'userid': userid })
    //   let options = new RequestOptions({ headers: headers })
    //   return this._http.get('/api/home/github', options)
    //     .map((res:Response) => res.json())
    // }

    // fetchGithubUserInfo(): Observable<any> {
    //   let username = localStorage.getItem('username')
    //   let username = localStorage.getItem('userid')
    //   let headers = new Headers({ 'username': username, 'userid': userid })
    //   let options = new RequestOptions({ headers: headers })
    //   return this._http.get('/api/home/github', options)
    //     .map((res:Response) => res.json())
    // }

  follow(followedUsername, userid):Observable<any> {
      let headers = new Headers({'userid': userid});
      headers.append('Content-Type', 'application/json');
      return this._http.post('/api/follows/' + userid + '/following', {'followedUsername': followedUsername}, {
        headers: headers
      })
  }

}
