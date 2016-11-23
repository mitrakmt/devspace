import { Component, OnInit, Output } from '@angular/core';
import { TeamService } from '../team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgForm } from "@angular/forms";
import { PieChartComponent } from './pie-chart/pie-chart.component';
//import {}
@Component({
  selector: 'app-team-project',
  templateUrl: './team-project.component.html',
  styleUrls: ['./team-project.component.css']
})

export class TeamProjectComponent implements OnInit {
  private teamId;
  private teamProjectId;
  private teamProjectInfo;
  private teamOwner;
  private teamRepo;
  private teamName;
  private teamProjectForks;
  private teamProjectContributors;
  private teamProjectLanguages;
  private teamProjectReadme;
  private teamProjectBranches;
  public repoLength;
  private branchesByContributor;
  private contributorsArr = [];
  private contributorsScore = [];
  // @Output() contributorsArr = [];
  // @Output() contributorsScore = [];

  constructor(private route: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
      this.teamProjectId = +params['teamProjectId']
      console.log(this.teamId, this.teamProjectId)
      this.teamService.fetchTeamProjectInfo(this.teamProjectId, this.teamId)
        .subscribe(teamProjectInfo => {
          this.teamProjectInfo = this.teamService.teamProjectInfo;
          this.teamRepo = this.teamService.teamRepo;
          this.repoLength = this.teamRepo.length + 1
          this.teamOwner = this.teamService.teamOwner;
          this.teamRepo = this.teamService.teamRepo;
          this.teamName = this.teamService.teamName;
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
          projectContributors.forEach(contributor => {
            this.contributorsArr.push(contributor.login)
            this.contributorsScore.push(contributor.contributions)
            this.teamService.teamProjectPieChartContributors.push(contributor.login)
            this.teamService.teamProjectPieChartScore.push(contributor.contribution)
          })
          console.log('projectContributors', this.contributorsArr, this.contributorsScore)
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
    
      this.teamService.fetchProjectBranches(this.teamProjectId, this.teamId)
        .subscribe(projectBranches => {
          var store = {};
          projectBranches.forEach(branch => {
            branch.login = branch.commit.url.slice(29, (-49 - this.repoLength))
            if (!store[branch.login]) {
              store[branch.login] = [branch]
            } else {
              store[branch.login].push(branch)
            }
          });
          console.log('store in fetchProjectBranches', store)
          this.branchesByContributor = store;
          this.teamProjectBranches = projectBranches
          return projectBranches;
      });
    });
  }
}
