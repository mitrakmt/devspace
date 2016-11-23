import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class ProfileService {

  constructor(private _http: Http) {  }

    public userData: {};
    public githubData: {};
    public bytesStat: 0;
    public languages: {};

    fetchBytes(username): Observable<any> {
      let headers = new Headers({ 'username': username })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/users/profile/code', options)
        .map((data:Response) => data.json())
    }

    fetchUserInfo(username): Observable<any> {
      let headers = new Headers({ 'username': username })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/users/userProfile', options)
        .map((data:Response) => data.json())
        .catch(err => {
          throw Observable.throw(err.json())
        })
    }

    fetchGithubUserInfo(username, currentUser): Observable<any> {
      let headers = new Headers({ 'username': username, 'currentUser': currentUser })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/users/userProfileGithub', options)
        .map((data:Response) => data.json())
        .catch(err => {
          throw Observable.throw(err.json())
        })
    }

  follow(followedUsername, userid): Observable<any> {
      let headers = new Headers({'userid': userid});
      headers.append('Content-Type', 'application/json');
      return this._http.post('/api/follows/' + userid + '/following', {'followedUsername': followedUsername}, {
        headers: headers
      })
  }
  
  fetchFollowing() {
      let userid = localStorage.getItem('userid')
      return this._http.get('/api/follows/' + userid + '/following')
        .map((res:Response) => {
          if (res) {
            this['following'] = res.json();
            return this['following']
          }
        })
    }

  checkMemberStatus(username): Observable<any> {
    let headers = new Headers({ 'username': username })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/users/getMemberStatus', options)
      .map((res:Response) => {
        return res
      })    
  }

  fetchFollowStatus(followedUsername): Observable<any> {
    let headers = new Headers({ 'followedusername': followedUsername })
    let options = new RequestOptions({ headers: headers })
    let username = localStorage.getItem('username')
    let userid = localStorage.getItem('userid')

    return this._http.get('/api/follows/' + userid + '/followStatus', options)
      .map((res:Response) => {
        return res
      })
  }

  fetchFollowers() {
     let userid = localStorage.getItem('userid')
     return this._http.get('/api/follows/' + userid + '/followers')
      .map((res:Response) => {
        if(res) {
          this['followers'] = res.json();
          return this['followers']
        }
      })
  }
}
