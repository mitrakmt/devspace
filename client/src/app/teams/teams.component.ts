import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgForm } from "@angular/forms";
import { Team } from './team';

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
    this.teamService.deleteTeam(teamId)
  }

  project = {name: ''}

  createTeam(form: NgForm) {
      let teamName = form.value.team;
      let userId = localStorage.getItem('userid');
      console.log(teamName, userId, 'teamName and userId')
      form.reset()
      this.teamService.createTeam(teamName, userId)
        .subscribe(
          data => {
            console.log('created Team', data)
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
