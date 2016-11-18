import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class SearchService {

  constructor(private _http: Http) { }

  searchUser(username:string, searchTerm:string): Observable<any> {
    let headers = new Headers({ 'username': username })
    let options = new RequestOptions({ headers: headers })
    headers.append('Content-Type', 'application/json');
    
    return this._http.get('/api/home/search/' + searchTerm, options)
      .map((res:Response) => res.json())
  }

}



