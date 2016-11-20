import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class SearchUsersService {
  
  searchedUsers = [];

  constructor(private _http: Http, private router: Router ) { }

    searchUsers(searchTerm): Observable<any> {
      let username = localStorage.getItem('username')
      let headers = new Headers({ 'searchText': searchTerm, 'username': username })
      let options = new RequestOptions({ headers: headers })
      
      return this._http.get('/api/users/search', options)
        .map((data:Response) => data.json())
        .catch(err=> {
          return Observable.throw(err.json());
        })
    }

    follow(followedUsername, userid):Observable<any> {
        let headers = new Headers({'userid': userid});
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/follows/' + userid + '/following', {'followedUsername': followedUsername}, {
          headers: headers
        })
    }

}
