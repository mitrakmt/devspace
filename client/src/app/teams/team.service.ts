import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Team } from './team';

@Injectable()
export class TeamService {
  private teamId;
  private userId;
  public teamProjects;
  public teams = [];
  public teamMembers;
  public teamContributions;
  public teamProjectInfo;
  public teamProjectId;
  public teamOwner;
  public teamName;
  public teamRepo;
  public teamContributors;
  public chartContributors = [];
  public contributionScore = [];
  public averageContribution: any = 'No Data Found';
  public medianContribution: any = 'No Data Found';
  public modeContribution: any = 'No Data Found';
  public mostRecentCommits = [];
  public commitDayContributors = [];
  public commitDays = [];
  public productiveDayByContributor = [];
  public commitHourContributors = [];
  public commitHours = [];
  public productiveHourByContributor = [];
  public teamProjectPieChartContributors = [];
  public teamProjectPieChartScore = [];
  public lineChartHoursData = [{data: [], label: 'No Data Found'}];
  public lineChartDaysData = [{data: [], label: 'No Data Found'}];

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
    console.log('teamName and teamId in team service', teamName, userId)
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
    let userid = localStorage.getItem('userid')
    let headers = new Headers({'userid': userid});
    headers.append('Content-Type', 'application/json');
    return this._http.delete('/api/teams/' + teamId, {
      headers: headers
    })
      .subscribe(result => {});
  }

  fetchTeamContributions(teamId): Observable<any> {
    this.teamId = teamId;
    let userId = localStorage.getItem('userid')
    let headers = new Headers({ 'userid': userId })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/teams/' + teamId + '/contributions', options)
      .map((res: Response) => {
        let result = res.json();
        
        if (!result.hasOwnProperty('err')) {
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

          let tempContributionScore = [];
          // separate contributors from contributions to render with chartjs
          for (let contributor in sum) {
            this.chartContributors.push(contributor);
            tempContributionScore.push(sum[contributor])
          }
          this.contributionScore = tempContributionScore;

          // calculate average
          let total = tempContributionScore.reduce((acc, curr) => {
            return acc + curr;
          }, 0)
          this.averageContribution = total / (this.chartContributors.length);

          // calculate median
          let sortedContributions = tempContributionScore.slice().sort((a,b) => {
            return a - b;
          })
          let lowMiddle = Math.floor((sortedContributions.length - 1) / 2);
          let highMiddle = Math.ceil((sortedContributions.length - 1) / 2);
          this.medianContribution = (sortedContributions[lowMiddle] + sortedContributions[highMiddle]) / 2;

          // calculate mode
          let freqArr = Object.keys(frequency).map( key => { return frequency[key]; });
          this.modeContribution = Math.max.apply(null, freqArr);
        } else {
          this.averageContribution = 'No data found'
          this.medianContribution = 'No data found'
          this.modeContribution = 'No data found'
        }

        return res.json();
      });
  }

  importTeamProject(projectName, teamId): Observable<any> {
    console.log(projectName, teamId, 'projectName and teamId in team service')
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
    return this._http.delete('/api/teams/' + teamId + '/member', options)
      .subscribe(result => {});
  }

  fetchTeamCommitFrequency(teamId): Observable<any> {
    this.teamId = teamId;
    return this._http.get('/api/teams/' + teamId + '/commit-freq')
      .map((res: Response) => {
        let result = res.json();

        if (!result.hasOwnProperty('err')) {
          /* most recent commit by each contributor */
          let committers = Object.keys(result.mostRecentCommit)
          for (let i = 0; i < committers.length; i++) {
            this.mostRecentCommits.push([committers[i], result.mostRecentCommit[committers[i]].date, result.mostRecentCommit[committers[i]].message]);
          }

          /* most productive day by contributor */
          // group contributors and their day freq
          var temp = [];
          for (let contributor in result.commitDay) {
            this.commitDayContributors.push(contributor)
            temp.push(result.commitDay[contributor])
          }

          // map day freq to arrays
          var tempLineChartDaysData = [];
          temp.forEach((obj, index) => {
            let tempDaysArr = [];
            let reduceFlag = false;
            let UTCdays = Object.keys(obj).reduce(function(a, b){
              if (!reduceFlag) {
                tempDaysArr.push(obj[a]);
                reduceFlag = true;
              }
              tempDaysArr.push(obj[b]);
              return obj[a] > obj[b] ? a : b 
            });
            tempLineChartDaysData.push({ data: tempDaysArr, label: this.commitDayContributors[index] });
            this.commitDays.push(UTCdays)
          })

          this.lineChartDaysData = tempLineChartDaysData;

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
          
          var tempLineChartHoursData = [];
          // map hour freq to arrays
          temps.forEach((obj, index) => {
            let tempHourArr = [];
            let reduceFlag = false;
            let UTChours = Object.keys(obj).reduce(function(a, b){
              if (!reduceFlag) {
                tempHourArr.push(Number(obj[a]));
                reduceFlag = true;
              }
              tempHourArr.push(Number(obj[b]));
              return obj[a] > obj[b] ? a : b 
            });

            tempLineChartHoursData.push({data: tempHourArr, label: this.commitHourContributors[index]})
            this.commitHours.push(UTChours)
          })

          this.lineChartHoursData = tempLineChartHoursData;

          for (let i = 0; i < this.commitHourContributors.length; i++) {
            this.productiveHourByContributor.push([this.commitHourContributors[i], Number(this.commitHours[i])])
          }
        }
        return res.json();
      });
  }

  fetchTeamProjectInfo(projectId, teamId): Observable<any> {
    this.teamProjectId = projectId;
    let headers = new Headers({ projectid: projectId });
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/teams/' + teamId + '/project', options)
      .map((res: Response) => {
        this.teamProjectInfo = res.json();
        this.teamOwner = this.teamProjectInfo.owner;
        this.teamRepo = this.teamProjectInfo.name;
        this.teamName = this.teamProjectInfo.team.name;
        return res.json();
      });
  }

  fetchTeamProjectCommits(projectId, branch): Observable<any> {
    let headers = new Headers({ branch: branch, username: this.teamName });
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
        return res.json();
      });
  }

  fetchProjectForks(projectId, teamName, teamRepo): Observable<any> {
    let headers = new Headers({ teamname: teamName, teamrepo: teamRepo })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/forks', options)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectContributors(projectId, teamOwner, teamName, teamRepo): Observable<any> {
    let headers = new Headers({ userid: this.teamOwner, teamname: teamName, teamrepo: teamRepo })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/contributors', options)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectLanguages(projectId, teamName, teamRepo): Observable<any> {
    let headers = new Headers({ teamname: teamName, teamrepo: teamRepo })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/languages', options)
      .map((res: Response) => {
        return res.json();
      });
  }

  fetchProjectReadme(projectId, teamName, teamRepo): Observable<any> {
    let headers = new Headers({ teamname: teamName, teamrepo: teamRepo })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/projects/' + projectId + '/readme', options)
      .map((res: Response) => {
        return res;
      });
  }
}
