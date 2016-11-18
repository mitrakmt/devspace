import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-team-dashboard',
  template: `
    hello world
    teamid: {{teamId}}
    <h1>Team Members</h1>
    <div *ngFor="let member of teamMembers">
      member: {{member.firstName}} {{member.lastName}} @{{member.username}}
    </div>

    <h1>Projects</h1>
    <div *ngFor="let project of teamProjects">
      
      name: <a [routerLink]="['/teams', teamId, project.id]">{{project.name}}</a> {{project.createdAt}} {{project.url}}
    </div>

     <h1>Contributions</h1>
    <div *ngFor="let contributor of teamContributions">
      name: {{contributor.login}} {{contributor.html_url}}
      contributions {{contributor.contributions}}
    </div>
    <h1>Import a project</h1>
    <form (ngSubmit)="submitTeamProject(f)" #f="ngForm">
      <md-input 
        placeholder="Github organization project name" 
        style="width: 100%"
        type="text"
        id="project"
        name="project"
        [(ngModel)]="project.name"
        #project = "ngModel"
        required>
      </md-input>
      <button md-raised-button type="submit" [disabled]="!f.valid" class="md-raised md-primary">Import Organization Project</button>
    </form>
    <h1>Add a Team Member</h1>
    <form (ngSubmit)="submitTeamMember(g)" #g="ngForm">
      <md-input 
        placeholder="Enter new member's username" 
        style="width: 100%"
        type="text"
        id="member"
        name="member"
        [(ngModel)]="member.name"
        #member = "ngModel"
        required>
      </md-input>
      <button md-raised-button type="submit" [disabled]="!f.valid" class="md-raised md-primary">Add a team member</button>
    </form>
  `,
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit {
  private teamId
  private teamProjects;
  private teamMembers;
  private userId = localStorage.getItem('userid')
  private teamContributions;

  project = {name: ''}

  submitTeamProject(form: NgForm) {
      let projectName = form.value.project;
      console.log(projectName)
      let userId = localStorage.getItem('userid');
      form.reset()
      this.teamService.importTeamProject(projectName, this.teamId)
        .subscribe(
          data => {
            console.log(data, 'data')
            return data
    })
  }

    submitTeamMember(form: NgForm) {
      let memberUsername = form.value.member;
      console.log(memberUsername)
      let userId = localStorage.getItem('userid');
      form.reset()
      this.teamService.addTeamMember(memberUsername, this.teamId)
        .subscribe(
          data => {
            console.log(data, 'data')
            return data
    })
  }

  constructor(private route: ActivatedRoute, private teamService: TeamService) {
   }

  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];

      this.teamService.fetchProjects(this.teamId)
          .subscribe(projects => {
            this.teamProjects = this.teamService.teamProjects;
            console.log('team projects', this.teamProjects)
            return projects;
          });

      this.teamService.fetchTeamMembers(this.teamId)
        .subscribe(teamMembers => {
          this.teamMembers = this.teamService.teamMembers;
          console.log('users in teamService', this.teamMembers)
          return teamMembers;
        });

      this.teamService.fetchTeamContributions(this.teamId)
        .subscribe(teamContributions => {
          this.teamContributions = this.teamService.teamContributions;
          console.log('team contributions', this.teamContributions)
          return teamContributions;
        });
      }
    }
}
