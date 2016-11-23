import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html' ,
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  private userId = localStorage.getItem('userid')
  private teams = [];
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

  createTeam(form: NgForm) {
      let teamName = form.value.team;
      console.log(teamName)
      let userId = localStorage.getItem('userid');
      form.reset()
      this.teamService.createTeam(teamName, userId)
        .subscribe(
          data => {
            this.teamService.teams.unshift(data);
            this.teams.unshift(data);
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
