import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { TeamService } from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgForm } from '@angular/forms';
import { ContributionsBarChartComponent } from './contributions-bar-chart/contributions-bar-chart.component';
import { HoursLineChartComponent } from './hours-line-chart/hours-line-chart.component';

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
  // private teamContributions;
  private subscriptions = {};
  @Output() lineChartData = this.teamService.lineChartHoursData;

  submitTeamProject(form: NgForm) {
    let projectName = form.value.project;
    let userId = localStorage.getItem('userid');
    form.reset();
    this.teamService.importTeamProject(projectName, this.teamId)
      .subscribe(
        data => {
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
          return data;
    })
  }

  constructor(private route: ActivatedRoute, private teamService: TeamService) { }
  
  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
      
      this.subscriptions['teamProjects'] = this.teamService.fetchProjects(this.teamId)
        .subscribe(projects => {
          this.teamProjects = this.teamService.teamProjects;
        });

      this.subscriptions['teamMembers'] = this.teamService.fetchTeamMembers(this.teamId)
        .subscribe(teamMembers => {
          this.teamMembers = this.teamService.teamMembers;
        });

      this.subscriptions['teamContributions'] = this.teamService.fetchTeamContributions(this.teamId)
        .subscribe(teamContributions => {});
        
      this.subscriptions['commitFreqs'] = this.teamService.fetchTeamCommitFrequency(this.teamId)
        .subscribe(commitFreqs => {});
      }); 
    }

  ngOnDestroy() {
    for (let subscription in this.subscriptions) {
      if(this.subscriptions[subscription]) {
        this.subscriptions[subscription].unsubscribe();
      }
    }
    this.teamService.chartContributors = [];
    this.teamService.contributionScore = [];
    this.teamService.mostRecentCommits = [];
    this.teamService.commitDayContributors = [];
    this.teamService.commitDays = [];
    this.teamService.commitHourContributors = [];
    this.teamService.commitHours = [];
    this.teamService.productiveDayByContributor = [];
    this.teamService.productiveHourByContributor = [];
  }
}
