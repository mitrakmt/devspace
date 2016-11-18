import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';

@Component({
  selector: 'app-teams',
  template: `
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
  ngOnInit() {
    this.teamService.fetchTeams(this.userId)
      .subscribe(teams => {
        this.teams = this.teamService.teams;
        return teams;
      });
  

  }

}
