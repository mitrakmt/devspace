import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamService {
  private teamId;
  private userId;
  public teamProjects;
  public teams;

  constructor(private _http: Http) { }

  // fetchProjects(teamId): Observable<any> {
  //   this.teamId = teamId;
  //   let username = localStorage.getItem('username')
  //   let headers = new Headers({ 'username': username })
  //   let options = new RequestOptions({ headers: headers })
  //   return this._http.get('/api/teams/' + teamId + '/projects', options)
  //     .map((res: Response) => {
  //       this.teamProjects = res;
  //       return res.json();
  //     });
  // }

  fetchTeams(userId): Observable<any> {
    this.userId = userId;
    let headers = new Headers({ 'userid': userId })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/teams', options)
      .map((res: Response) => {
        this.teams = res;
        console.log('res in fetchTeams', res)
        return res.json();
      });
  }
}
