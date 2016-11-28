import { Component, OnInit, DoCheck } from '@angular/core';
import { ProjectDashboardService } from './project-dashboard.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: `
    <app-search></app-search>

    <div class="landing" style="text-align: center; margin-top: 30px;">
      <h1 class="heading">{{projectName}}</h1>
      <h2 class="title">{{projectInfo?.deadline}}</h2>
    </div>

    <h2 class="title">Contributors</h2>
    <div class="team-member-div">
      <md-card *ngFor="let contributor of projectContributors" class="team-member-card">
        <img src="{{ contributor.avatar }}" class="team-member-card-image" />
        <h2 class="team-member-card-name">
          @{{ contributor.login }}
        </h2>  
        <p class="team-member-card-username">
          Contribution Score:
          <br />
          {{ contributor?.contributions }}
        </p>
      </md-card>

      <div *ngIf="!projectContributors || projectContributors.length === 0">
        <span>No data found. Try again in an hour.</span>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 70px;">
      <h2 class="title">Languages</h2>
      <md-grid-list cols="5" rowHeight="110px">
        <md-grid-tile class="language" *ngFor="let lang of projectLanguages">
          <div>
            <p>{{lang.language[0]}}:{{lang.language[1]}}</p>
            <img [src]="lang.language[2]" />
          </div>   
        </md-grid-tile>
      </md-grid-list>
  
      <div *ngIf="!projectLanguages">
        Github has not yet calculated the language statistics for your project.
      </div>
    </div>

    <div style="text-align: center; margin-top: 50px;">
      <h2 class="title">Forks</h2>
      <div *ngIf="projectForks && projectForks.length > 0">
        <p *ngFor="let fork of projectForks">
          {{fork?.owner}}
          Github url: {{fork?.html_url}}
        </p>
      </div>
      <div *ngIf="!projectForks || projectForks.length === 0">
        <span>No forks found.</span>
      </div>
    </div>

    <div style="text-align: center; margin-top: 50px;">
      <h2 class="title">Branches</h2>
      <p *ngFor="let branch of projectBranches" class="link">
        <a href="{{ branch.url }}" target="_blank">{{branch?.name}}</a>
      </p>
      <div *ngIf="!projectBranches || projectBranches.length === 0">
        <span>No branches found.</span>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 50px;">
      <md-card class="readme" *ngIf="projectReadme?._body" style="text-align: left; margin: 100px;">
        <h2 class="title" style="text-align: center;">Readme</h2>
        <p [innerHTML]="projectReadme?._body" style="text-align: left; margin: 50px;"></p>
      </md-card>
      <div *ngIf="!projectReadme">
        <span>No readme found.</span>
      </div>
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
          this.projectInfo = this.projectDashboardService.projectInfo;
          this.projectName = projectInfo.name;
          this.owner = this.projectDashboardService.owner;
          this.repo = this.projectDashboardService.repo;
          return projectInfo;
        });
      
    this.projectDashboardService.fetchProjectForks(this.projectId)
      .subscribe(projectForks => {
        this.projectForks = projectForks;
        return projectForks;
      });

    this.projectDashboardService.fetchProjectContributors(this.projectId)
      .subscribe(projectContributors => {
        this.projectContributors = projectContributors;
        return projectContributors;
      });

    this.projectDashboardService.fetchProjectLanguages(this.projectId)
      .subscribe(projectLanguages => {
        this.projectLanguages = projectLanguages;
        for(let i = 0; i < this.projectLanguages.length; i++) {
          if (this.projectLanguages[i].language[0] === 'JavaScript') {
            this.projectLanguages[i].language[2] = "https://wp-andypiapps.rhcloud.com/wp-content/uploads/2016/08/js4560_450.png"
          } else if (this.projectLanguages[i].language[0] === 'HTML') {
            this.projectLanguages[i].language[2] = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/200px-HTML5_logo_and_wordmark.svg.png"
          } else if (this.projectLanguages[i].language[0] === 'TypeScript') {
            this.projectLanguages[i].language[2] = "https://chocolatey.org/content/packageimages/typescript.vs.1.0.1.png"
          } else if (this.projectLanguages[i].language[0] === 'CSS') {
            this.projectLanguages[i].language[2] = "http://2016.cssday.it/img/confs/css/css3.png"
          } else if (this.projectLanguages[i].language[0] === 'Java') {
            this.projectLanguages[i].language[2] = "https://ignite.apache.org/images/java.png"
          } else if (this.projectLanguages[i].language[0] === 'Ruby') {
            this.projectLanguages[i].language[2] = "http://nicholasjohnson.com/images/sections/ruby.png"
          }
        }
        return projectLanguages;
      });

    this.projectDashboardService.fetchProjectReadme(this.projectId)
      .subscribe(projectReadme => {
        this.projectReadme = projectReadme;
        return projectReadme;
      });

    this.projectDashboardService.fetchProjectBranches(this.projectId)
      .subscribe(projectBranches => {
        this.projectBranches = projectBranches;
        return projectBranches;
      });
    });
  }
}
