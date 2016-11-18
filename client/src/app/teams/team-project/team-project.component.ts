import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-team-project',
  template:`
    <app-search></app-search>
    hello
    <div class="landing" md-margin layout-align="center">
      <h1 class="md-display-2">{{teamRepo}}</h1>
      <h2 class="md-display-1">{{teamProjectInfo?.deadline}}</h2>
    </div>

    <h3>Contributors</h3>
    <div *ngFor="let contributor of teamProjectContributors">
      <h4><a [routerLink]="['/profile', username]">{{ contributor?.login }}</a>: {{ contributor?.contributions }}</h4>
    </div>

    <h3>Languages</h3>
    <div *ngFor="let lang of teamProjectLanguages">
      <p>{{lang.language[0]}}:{{lang.language[1]}}</p>
      <img [src]="lang.language[image_url]" />
    </div>


    <div>
      <h3>Forks</h3>
      <p *ngFor="let fork of teamProjectForks">
        {{fork?.owner}}
        Github url: {{fork?.html_url}}
      </p>
    </div>

    <div>
      <h3>Branches</h3>
      <p *ngFor="let branch of teamProjectBranches">
        {{branch?.name}}
      </p>
    </div>
    
    <div class="readme">
      <h3>Readme</h3>
      {{teamProjectReadme?._body}}
    </div>
  `,
  styleUrls: ['./team-project.component.css']
})

export class TeamProjectComponent implements OnInit {
  private teamId;
  private teamProjectId;
  private teamProjectInfo;
  private teamOwner;
  private teamRepo;
  private teamProjectForks;
  private teamProjectContributors;
  private teamProjectLanguages;
  private teamProjectReadme;
  private teamProjectBranches;

  constructor(private route: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
      this.teamProjectId = +params['teamProjectId']

      this.teamService.fetchProjectInfo(this.teamProjectId)
        .subscribe(teamProjectInfo => {
          this.teamProjectInfo = this.teamService.teamProjectInfo;
          this.teamRepo = this.teamService.teamRepo;
          this.teamOwner = this.teamService.teamOwner;
          this.teamRepo = this.teamService.teamRepo;
          return teamProjectInfo;
      });

      this.teamService.fetchProjectForks(this.teamProjectId)
        .subscribe(projectForks => {
          this.teamProjectForks = projectForks;
          return projectForks;
      });
      
      this.teamService.fetchProjectContributors(this.teamProjectId)
        .subscribe(projectContributors => {
          this.teamProjectContributors = projectContributors;
          return projectContributors;
      });

      this.teamService.fetchProjectLanguages(this.teamProjectId)
        .subscribe(projectLanguages => {
          this.teamProjectLanguages = projectLanguages;
          return projectLanguages;
      });

      this.teamService.fetchProjectReadme(this.teamProjectId)
        .subscribe(projectReadme => {
          this.teamProjectReadme = projectReadme;
          return projectReadme;
      });
    
      this.teamService.fetchProjectBranches(this.teamProjectId)
        .subscribe(projectBranches => {
          this.teamProjectBranches = projectBranches;
          return projectBranches;
      });
    });
  }
}
