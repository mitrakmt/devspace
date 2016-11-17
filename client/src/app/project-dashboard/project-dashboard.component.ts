import { Component, OnInit, DoCheck } from '@angular/core';
import { ProjectDashboardService } from './project-dashboard.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: `
    <app-search></app-search>

    <div class="landing" md-margin layout-align="center">
      <h1 class="md-display-2">{{projectName}}</h1>
      <h2 class="md-display-1">{{projectInfo?.deadline}}</h2>
    </div>

    <md-grid-list cols="2" rowHeight="200px" layout="column">
      <md-grid-tile layout="column">
        <h3>Contributors</h3>
        <div *ngFor="let contributor of projectContributors">
          <h4><a [routerLink]="['/profile', username]">{{ contributor?.login }}</a>: {{ contributor?.contributions }}</h4>
        </div>
      </md-grid-tile>
      <md-grid-tile>
        <h3>Languages</h3>
        <div *ngFor="let lang of projectLanguages">
          <p>{{lang.language[0]}}:{{lang.language[1]}}</p>
          <img [src]="lang.language[image_url]" />
        </div>
      </md-grid-tile>
    </md-grid-list>

    <div>
      <h3>Forks</h3>
      <p *ngFor="let fork of projectForks">
        {{fork?.owner}}
        Github url: {{fork?.html_url}}
      </p>
    </div>

    <div>
      <h3>Branches</h3>
      <p *ngFor="let branch of projectBranches">
        {{branch?.name}}
      </p>
    </div>

    <select *ngFor="let branch in projectBranches">
      <option value="{{branch.name}}">{{branch.name}}</option>
    </select>

    <div class="readme">
      <h3>Readme</h3>
      {{projectReadme?._body}}
    </div>

    <app-project-commits [projectId]="projectId"></app-project-commits>
  `,
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  private projectId: number;
  private projectInfo = this.projectDashboardService.projectInfo;
  private projectCommits;
  private projectBranches;
  private projectForks;
  private owner;
  private repo;
  private projectContributors;
  private projectLanguages;
  private projectReadme;
  private projectName;
  private username;

  constructor(private route: ActivatedRoute, private projectDashboardService: ProjectDashboardService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');

    return this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];

      this.projectDashboardService.fetchProjectInfo(this.projectId)
        .subscribe(projectInfo => {
          console.log('proj info1: ', projectInfo)
          this.projectInfo = this.projectDashboardService.projectInfo;
          this.projectName = projectInfo.name;
          console.log('projectName', this.projectName)
          this.owner = this.projectDashboardService.owner;
          this.repo = this.projectDashboardService.repo;
          console.log('project info', this.projectInfo);
          return projectInfo;
        });
      
    this.projectDashboardService.fetchProjectForks(this.projectId)
      .subscribe(projectForks => {
        this.projectForks = projectForks;
        console.log('project forks', this.projectForks);
        return projectForks;
      });

    this.projectDashboardService.fetchProjectContributors(this.projectId)
      .subscribe(projectContributors => {
        this.projectContributors = projectContributors;
        console.log('project Contributors', this.projectContributors);
        return projectContributors;
      });

    this.projectDashboardService.fetchProjectLanguages(this.projectId)
      .subscribe(projectLanguages => {
        this.projectLanguages = projectLanguages;
        // let images = {
        //   'Angular': 'https://i.ytimg.com/i/bn1OgGei-DV7aSRo_HaAiw/mq1.jpg?v=57d9f2ca',
        //   'HTML': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/200px-HTML5_logo_and_wordmark.svg.png',
        //   'CSS': 'https://platform-user-uploads.s3.amazonaws.com/blog/category/logo/364/CSS.png',
        //   'JavaScript': 'http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png',
        //   'TypeScript': 'https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png',
        //   'Python': 'https://www.python.org/static/opengraph-icon-200x200.png',
        //   'Java': 'https://ignite.apache.org/images/java.png'
        // }
        // projectLanguages.forEach(language => {
        //   language.language.push(images[language.language[0]]);
        // })
        console.log('project Languages', this.projectLanguages);
        return projectLanguages;
      });

    this.projectDashboardService.fetchProjectReadme(this.projectId)
      .subscribe(projectReadme => {
        this.projectReadme = projectReadme;
        console.log('project Readme', this.projectReadme);
        return projectReadme;
      });
    
    this.projectDashboardService.fetchProjectBranches(this.projectId)
      .subscribe(projectBranches => {
        this.projectBranches = projectBranches;
        console.log('project Branches', this.projectBranches);
        return projectBranches;
      });
    });
  }
}
