import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectDashboardService {
  public projectInfo;
  public projectId;
  public owner;
  public repo;

  constructor(private _http: Http) { }

  fetchProjectInfo(projectId): Observable<any> {
    this.projectId = projectId
    return this._http.get('/api/projects/' + projectId)
      .map((res: Response) => {
        this.projectInfo = res;
        this.owner = this.projectInfo.owner;
        this.repo = this.projectInfo.name;
        return res.json();
      });
  }

  fetchProjectCommits(projectId, branch): Observable<any> {
    let headers = new Headers({ branch: branch, username: null });
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/commits', options)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectBranches(projectId): Observable<any> {
    return this._http.get('/api/projects/' + projectId + '/branches')
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectForks(projectId): Observable<any> {
    return this._http.get('/api/projects/' + projectId + '/forks')
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectContributors(projectId): Observable<any> {
    return this._http.get('/api/projects/' + projectId + '/contributors')
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectLanguages(projectId): Observable<any> {
    return this._http.get('/api/projects/' + projectId + '/languages')
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectReadme(projectId): Observable<any> {
    return this._http.get('/api/projects/' + projectId + '/readme')
      .map((res: Response) => {
        return res['_body'];
      });
  }
}
