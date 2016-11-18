import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgForm } from "@angular/forms";

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
    <div *ngFor="let team of teams">
      team: <a [routerLink]="['/teams', team.id]">{{team.name}}</a>
    </div>
  `,
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  private userId = localStorage.getItem('userid')
  private teams;
  private teamId;
  private teamMembers;
  constructor(private teamService: TeamService) { }

  fetchTeams() {
    this.teamService.fetchTeams(this.userId)
  }
    project = {name: ''}

  createTeam(form: NgForm) {
      let teamName = form.value.team;
      console.log(teamName)
      let userId = localStorage.getItem('userid');
      form.reset()
      this.teamService.createTeam(teamName, userId)
        .subscribe(
          data => {
            console.log(data, 'data')
            return data
    })
  }

  ngOnInit() {
    this.teamService.fetchTeams(this.userId)
      .subscribe(teams => {
        this.teams = this.teamService.teams;
        return teams;
      });
  

  }

}
