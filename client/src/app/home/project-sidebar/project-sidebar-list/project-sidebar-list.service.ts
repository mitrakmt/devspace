import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ProjectSidebarListService {

  constructor(private _http: Http) { }

  getSidebarProjects(): Observable<any> {
    let headers = new Headers({ 'userid': '1', username: 'davidkim310' })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/home/sidebar', options)
      .map((res:Response) => res.json())
  }
}
