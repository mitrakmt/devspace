import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgForm } from "@angular/forms";
import { Team } from './team';

@Component({
  selector: 'app-teams',
  template: `
      <app-search></app-search>
      <form (ngSubmit)="createTeam(f)" #f="ngForm">
        <div class="form-group">
          <label for="team">Team</label>
          <input 
            type="text"
            id="team"
            style="width: 55%;"
            name="team"
            [(ngModel)]="team.name"
            #team = "ngModel"
            required
            >
            <button type="submit" class="btn btn-primary" [disabled]="!f.valid">Create Team</button>
        </div>
      </form>
    <div *ngFor="let team of teamService.teams">
      team: <a [routerLink]="['/teams', team.id]">{{team.name}}</a> <button (click)="this.teamService.deleteTeam(team.id)">Delete Team</button>
    </div>
    
  `,
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  private userId = localStorage.getItem('userid')
  // public teams: Team[] = [];
  private teamId;
  private teamMembers;
  constructor(private teamService: TeamService) { }

  fetchTeams() {
    this.teamService.fetchTeams(this.userId)
  }

  deleteTeam(teamId) {
    console.log('inside teams component ts', teamId)
    this.teamService.deleteTeam(teamId)
  }
    project = {name: ''}

  createTeam(form: NgForm) {
      let teamName = form.value.team;
      // console.log(teamName)
      let userId = localStorage.getItem('userid');
      this.teamService.createTeam(teamName, userId)
        .subscribe(
          data => {
            console.log("data: ", data)
            this.teamService.teams.unshift(data)
    
            // this.teams.unshift(data)
            // console.log("this.teams", this.teams)
            // console.log("this.teamService.teams", this.teamService.teams)
        })
      form.reset()
  }

  ngOnInit() {
    this.teamService.fetchTeams(this.userId)
      .subscribe(teams => {
        this.teams = this.teamService.teams;
        return teams;
      });
  }

}
