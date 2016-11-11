import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ProjectDashboardService {

  constructor(private _http: Http) { }

  fetchProjectInfo(projectId): Observable<any> {
    console.log('inside dashboard service, fetchProjectInfo', projectId, (typeof projectId))
    return this._http.get(`/api/projects/${{projectId}}`)
      .map((res:Response) => {
        console.log('inside fetchProjectInfo res',res)
        return res.json()
      })
  }
}
