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
  public teamMembers;
  public teamContributions;

  constructor(private _http: Http) { }

  fetchProjects(teamId): Observable<any> {
    this.teamId = teamId;
    let userId = localStorage.getItem('userid')
    let headers = new Headers({ 'userid': userId })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/teams/' + teamId + '/projects', options)
      .map((res: Response) => {
        this.teamProjects = res.json();
        return res.json();
      });
  }

  fetchTeams(userId): Observable<any> {
    this.userId = userId;
    let headers = new Headers({ 'userid': userId })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/teams', options)
      .map((res: Response) => {
        this.teams = res.json();
        return res.json();
      });
  }

    fetchTeamMembers(teamId): Observable<any> {
    this.teamId = teamId;
    return this._http.get('/api/teams/' + teamId + '/member')
      .map((res: Response) => {
        this.teamMembers = res.json();
        return res.json();
      });
  }

    createTeam(teamInfo){
      let userid = localStorage.getItem('userid')
      let body = {
        teamName: teamInfo.teamName,
        teamDescription: teamInfo.teamDescription || null,
       };
      let headers = new Headers({'userid': userid});
      headers.append('Content-Type', 'application/json');
      return this._http.post('/api/teams', body, {
        headers: headers
      })
        .map((data) => data.json())
    }

    fetchTeamContributions(teamId): Observable<any> {
      this.teamId = teamId;
      let userId = localStorage.getItem('userid')
      let headers = new Headers({ 'userid': userId })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/teams/' + teamId + '/contributions', options)
        .map((res: Response) => {
          this.teamContributions = res.json();
          return res.json();
        });
  }
}
