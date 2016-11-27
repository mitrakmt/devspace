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
        <div *ngIf="!projectContributors || projectContributors.length === 0">
          <span>No data found. Try again in an hour.</span>
        </div>
      </md-grid-tile>
      <md-grid-tile>
        <h3>Languages</h3>
        <div *ngFor="let lang of projectLanguages">
          <p>{{lang.language[0]}}:{{lang.language[1]}}</p>
          <img [src]="lang.language[image_url]" />
        </div>
        <div *ngIf="!projectLanguages || projectLanguages.length === 0">
          <span>No data found. Try again in an hour.</span>
        </div>
      </md-grid-tile>
    </md-grid-list>

    <div>
      <h3>Forks</h3>
      <div *ngIf="projectForks && projectForks.length > 0">
        <p *ngFor="let fork of projectForks">
          {{fork?.owner}}
          Github url: {{fork?.html_url}}
        </p>
      </div>
      <div *ngIf="!projectForks || projectForks.length === 0">
        <span>No one has forked your project yet.</span>
      </div>
    </div>

    <div>
      <h3>Branches</h3>
      <p *ngFor="let branch of projectBranches">
        {{branch?.name}}
      </p>
      <div *ngIf="!projectBranches || projectBranches.length === 0">
        <span>No data found. Try again in an hour.</span>
      </div>
    </div>
    
    <div class="readme">
      <h3>Readme</h3>
      <p><span [innerHTML]="projectReadme"></span></p>
      <div *ngIf="!projectReadme">
        <span>No data found. Try again in an hour.</span>
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
