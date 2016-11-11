import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectDashboardService {

  constructor(private _http: Http) { }

  fetchProjectInfo(projectId): Observable<any> {
    return this._http.get('/api/projects/' + projectId)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectCommits(projectId): Observable<any> {
    let headers = new Headers({ 'username': 'hackersquare', repo: 'devspace' });
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/commits', options)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectBranches(projectId): Observable<any> {
    let headers = new Headers({ 'username': 'hackersquare', repo: 'devspace' });
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/branches', options)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectForks(projectId): Observable<any> {
    let headers = new Headers({ 'username': 'hackersquare', repo: 'devspace' });
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/forks', options)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectContributors(projectId): Observable<any> {
    let headers = new Headers({ 'username': 'hackersquare', repo: 'devspace' });
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/contributors', options)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectLanguages(projectId): Observable<any> {
    let headers = new Headers({ 'username': 'hackersquare', repo: 'devspace' });
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/languages', options)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectReadme(projectId): Observable<any> {
    let headers = new Headers({ 'username': 'hackersquare', repo: 'devspace' });
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/readme', options)
      .map((res: Response) => {
        return res.json();
      });
  }
}
