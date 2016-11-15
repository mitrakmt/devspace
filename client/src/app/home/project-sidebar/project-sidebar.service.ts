import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ProjectSidebarService {

  constructor(private _http: Http) { }

  addProject(): Observable<any> {
    // make some call to add project
    let username = localStorage.getItem('username')
    let userid = localStorage.getItem('userid')
    let headers = new Headers({ 'userid': userid, username: username })
    let options = new RequestOptions({ headers: headers })
    
    return this._http.post('/api/projects', options)
      .map((res:Response) => res.json())
  }

}
