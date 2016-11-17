import { Component, OnInit } from '@angular/core';
import { TeamDashboardService } from './team-dashboard.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';

@Component({
  selector: 'app-team-dashboard',
  template: `
    hello world
    teamid: {{teamId}}
  `,
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit {
  private teamId;
  private teamProjects;
  private teams;
  private userId = localStorage.getItem('userid')

  constructor(private route: ActivatedRoute, private teamDashboardService: TeamDashboardService) { }

  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];

      // this.teamDashboardService.fetchProjects(this.teamId)
      //   .subscribe(projects => {
      //     this.teamProjects = this.teamDashboardService.teamProjects;
      //     return projects;
      //   });


      this.teamDashboardService.fetchTeams(this.userId)
        .subscribe(teams => {
          this.teams = this.teamDashboardService.teams;
          console.log(teams, 'teams')
          return teams;
        });
   }
  }

}
