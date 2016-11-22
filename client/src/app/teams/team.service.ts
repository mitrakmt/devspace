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
  public teamProjectInfo;
  public teamProjectId;
  public teamOwner;
  public teamRepo;
  public teamContributors;
  public chartContributors = [];
  public contributionScore = [];
  public averageContribution;
  public medianContribution;
  public modeContribution;
  public mostRecentCommits = [];
  public commitDayContributors = [];
  public commitDays = [];
  public productiveDayByContributor = [];
  public commitHourContributors = [];
  public commitHours = [];
  public productiveHourByContributor = [];

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
  
  createTeam(teamName, userId) {
    let userid = localStorage.getItem('userid')
    let body = { teamName: teamName };
    let headers = new Headers({'userid': userid});
    headers.append('Content-Type', 'application/json');
    return this._http.post('/api/teams', body, {
      headers: headers
    })
      .map((data) => data.json())
  }

  deleteTeam(teamId) {
    console.log('inside team service', teamId)
    let userid = localStorage.getItem('userid')
    let headers = new Headers({'userid': userid});
    headers.append('Content-Type', 'application/json');
    return this._http.delete('/api/teams/' + teamId, {
      headers: headers
    })
      .subscribe(result => { console.log('deleted team') });
  }

  fetchTeamContributions(teamId): Observable<any> {
    this.teamId = teamId;
    let userId = localStorage.getItem('userid')
    let headers = new Headers({ 'userid': userId })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/teams/' + teamId + '/contributions', options)
      .map((res: Response) => {
        let result = res.json();

        // add up overall team contributions and frequencies across all projects
        let sum = {};
        let frequency = {};
        result.forEach(contribution => {

          // sum up contributions
          if (!sum[contribution.login]) {
            sum[contribution.login] = contribution.contributions;
          } else {
            sum[contribution.login] += contribution.contributions;
          }

          // count frequencies
          if (!frequency[contribution.contributions]) {
            frequency[contribution.contributions] = 1;
          } else {
            frequency[contribution.contributions]++;
          }
        })

        // separate contributors from contributions to render with chartjs
        for (let contributor in sum) {
          this.chartContributors.push(contributor);
          this.contributionScore.push(sum[contributor])
        }
        
        // calculate average
        let total = this.contributionScore.reduce((acc, curr) => {
          return acc + curr;
        }, 0)

        this.averageContribution = total/(this.chartContributors.length);

        // calculate median
        let sortedContributions = this.contributionScore.slice().sort((a,b) => {
          return a - b;
        })
        let lowMiddle = Math.floor((sortedContributions.length - 1) / 2);
        let highMiddle = Math.ceil((sortedContributions.length - 1) / 2);
        this.medianContribution = (sortedContributions[lowMiddle] + sortedContributions[highMiddle]) / 2;
        
        // calculate mode
        let freqArr = Object.keys(frequency).map( key => { return frequency[key]; });
        this.modeContribution = Math.max.apply( null, freqArr );
        return res.json();
      });
  }

  importTeamProject(projectName, teamId): Observable<any> {
    let userid = localStorage.getItem('userid')
    let headers = new Headers({ userid: userid })
    let options = new RequestOptions({ headers: headers })
    let body = {
      name: projectName,
      teamId: teamId
    };

    return this._http.post('/api/projects', body, options)
      .map((res:Response) => res.json())
  }

  addTeamMember(username, teamId): Observable<any> {
    let userid = localStorage.getItem('userid')
    let headers = new Headers({ userid: userid })
    let options = new RequestOptions({ headers: headers })
    let body = {
      username: username
    };

    return this._http.post('/api/teams/' + teamId + '/member', body, options)
      .map((res:Response) => res.json())
  }

  removeTeamMember(idToRemove, teamId) {
    let userid = localStorage.getItem('userid')
    let headers = new Headers({ userid: userid, idtoremove: idToRemove })
    let options = new RequestOptions({ headers: headers })
    console.log('removeTeamMember, idToRemve: ',idToRemove, 'teamId: ', teamId)
    return this._http.delete('/api/teams/' + teamId + '/member', options)
      .subscribe(result => { console.log('deleted member') });
  }

  fetchTeamCommitFrequency(teamId): Observable<any> {
    this.teamId = teamId;
    return this._http.get('/api/teams/' + teamId + '/commit-freq')
      .map((res: Response) => {
        let result = res.json();

        /* most recent commit by each contributor */
        for (let contributor in result.mostRecentCommit) {
          this.mostRecentCommits.push(contributor);
        }

        /* most productive day by contributor */
        // group contributors and their day freq
        var temp = [];
        for (let contributor in result.commitDay) {
          this.commitDayContributors.push(contributor)
          temp.push(result.commitDay[contributor])
        }

        // map day freq to arrays
        temp.forEach(obj => {
          let UTCdays = Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
          this.commitDays.push(UTCdays)
        })

        // convert to SMTWTFS
        let daysOfWeek = {
          0: 'Sunday',
          1: 'Monday',
          2: 'Tuesday',
          3: 'Wednesday',
          4: 'Thursday',
          5: 'Friday',
          6: 'Saturday',
          7: 'Sunday'
        }
        
        let mostCommitDays = this.commitDays.map(UTCday => {
          return daysOfWeek[UTCday]
        })

        // this.commitDays and this.commitDayContributors are available to render with chartjs
        // productiveDayByContributor is to render by string interpolation
        for (let i = 0; i < this.commitDayContributors.length; i++) {
          this.productiveDayByContributor.push([this.commitDayContributors[i], mostCommitDays[i]])
        }
        
        /* most productive hour by contributor */
        var temps = [];
        for (let contributor in result.commitHour) {
          this.commitHourContributors.push(contributor)
          temps.push(result.commitHour[contributor])
        }

        // map hour freq to arrays
        temps.forEach(obj => {
          let UTChours = Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
          this.commitHours.push(UTChours)
        })

        for (let i = 0; i < this.commitHourContributors.length; i++) {
          this.productiveHourByContributor.push([this.commitHourContributors[i], Number(this.commitHours[i])])
        }
        return res.json();
      });
  }

  fetchProjectInfo(projectId): Observable<any> {
    this.teamProjectId = projectId
    return this._http.get('/api/projects/' + projectId)
      .map((res: Response) => {
        this.teamProjectInfo = res.json();
        this.teamOwner = this.teamProjectInfo.owner;
        this.teamRepo = this.teamProjectInfo.name;
         console.log('res in fetchProjectInfo', this.teamProjectInfo, this.teamOwner, this.teamRepo)
        return res.json();
      });
  }

  fetchProjectCommits(projectId, branch): Observable<any> {
    let headers = new Headers({ branch: branch });
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/commits', options)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectBranches(projectId, teamId): Observable<any> {
    let headers = new Headers({ projectid: projectId });
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/teams/' + teamId + '/branches', options)
      .map((res: Response) => {
        console.log(res.json())
        return res.json();
      });
  }
  
  //  fetchProjectBranches(projectId): Observable<any> {
  //   return this._http.get('/api/projects/' + projectId + '/branches')
  //     .map((res: Response) => {
  //       return res.json();
  //     });
  // }

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
        return res;
      });
  }
}
