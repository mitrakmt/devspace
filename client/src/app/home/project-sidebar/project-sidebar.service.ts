import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ProjectSidebarService {

  constructor(private _http: Http) { }

  importProject(userid, projectName): Observable<any> {
    let headers = new Headers({ 'userid': userid})
    let options = new RequestOptions({ headers: headers })
    
    return this._http.post('/api/projects', {"name": projectName}, options)
      .map((res:Response) => res.json())
  }

}