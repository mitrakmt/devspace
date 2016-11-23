import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgForm } from '@angular/forms';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css']
})

export class TeamDashboardComponent implements OnInit {
  private teamId;
  private teamProjects;
  private teamMembers;
  private userId = localStorage.getItem('userid');
  private teamContributions;

  submitTeamProject(form: NgForm) {
    let projectName = form.value.project;
    let userId = localStorage.getItem('userid');
    form.reset();
    this.teamService.importTeamProject(projectName, this.teamId)
      .subscribe(
        data => {
          console.log(data, 'imported project');
          return data;
    })
  }

  submitTeamMember(form: NgForm) {
    let memberUsername = form.value.member;
    let userId = localStorage.getItem('userid');
    form.reset();
    this.teamService.addTeamMember(memberUsername, this.teamId)
      .subscribe(
        data => {
          console.log(data, 'imported member');
          return data;
    })
  }

  constructor(private route: ActivatedRoute, private teamService: TeamService) { }
  
  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
      
      this.teamService.fetchProjects(this.teamId)
        .subscribe(projects => {
          this.teamProjects = this.teamService.teamProjects;
          return projects;
        });

      this.teamService.fetchTeamMembers(this.teamId)
        .subscribe(teamMembers => {
          this.teamMembers = this.teamService.teamMembers;
          return teamMembers;
        });

      this.teamService.fetchTeamContributions(this.teamId)
        .subscribe(teamContributions => {
          this.teamContributions = this.teamService.teamContributions;
          return teamContributions;
        });
        
      this.teamService.fetchTeamCommitFrequency(this.teamId)
        .subscribe(commitFreqs => {
          return commitFreqs;
        });
      }); 
    }
}
