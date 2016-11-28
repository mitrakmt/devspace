import { Component, OnInit, Output, AfterViewInit } from '@angular/core';
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
  private teamSize;
  private teamProjectForks;
  private teamProjectContributors;
  private teamProjectLanguages;
  private teamProjectReadme;
  private teamProjectBranches;
  public repoLength;
  private branchesByContributor;

  constructor(private route: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
      this.teamProjectId = +params['teamProjectId']

      this.teamService.fetchTeamProjectInfo(this.teamProjectId, this.teamId)
        .subscribe(teamProjectInfo => {
          this.teamProjectInfo = this.teamService.teamProjectInfo;
          this.teamRepo = this.teamService.teamRepo;
          this.repoLength = this.teamRepo.length + 1
          this.teamOwner = this.teamService.teamOwner;
          this.teamRepo = this.teamService.teamRepo;
          this.teamName = this.teamService.teamName;
          
          this.teamService.fetchProjectContributors(this.teamProjectId, this.teamOwner, this.teamName, this.teamRepo)
            .subscribe(projectContributors => {
              this.teamProjectContributors = projectContributors;
              let tempTeamProjectPieChartContributors = [];
              let tempTeamProjectPieChartScore = [];
              projectContributors.forEach(contributor => {
               tempTeamProjectPieChartContributors.push(contributor.login)
               tempTeamProjectPieChartScore.push(contributor.contributions)
              })
              console.log('projectContributors', projectContributors)
              this.teamSize = projectContributors.length;
              this.teamService.teamProjectPieChartContributors = tempTeamProjectPieChartContributors;
              this.teamService.teamProjectPieChartScore = tempTeamProjectPieChartScore;    

             return projectContributors;
          });
          
          this.teamService.fetchProjectLanguages(this.teamProjectId, this.teamName, this.teamRepo)
            .subscribe(projectLanguages => {
              this.teamProjectLanguages = projectLanguages;
              for(let i = 0; i < this.teamProjectLanguages.length; i++) {
                if (this.teamProjectLanguages[i].language[0] === 'JavaScript') {
                  this.teamProjectLanguages[i].language[2] = "https://wp-andypiapps.rhcloud.com/wp-content/uploads/2016/08/js4560_450.png"
                } else if (this.teamProjectLanguages[i].language[0] === 'HTML') {
                  this.teamProjectLanguages[i].language[2] = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/200px-HTML5_logo_and_wordmark.svg.png"
                } else if (this.teamProjectLanguages[i].language[0] === 'TypeScript') {
                  this.teamProjectLanguages[i].language[2] = "https://chocolatey.org/content/packageimages/typescript.vs.1.0.1.png"
                } else if (this.teamProjectLanguages[i].language[0] === 'CSS') {
                  this.teamProjectLanguages[i].language[2] = "http://2016.cssday.it/img/confs/css/css3.png"
                } else if (this.teamProjectLanguages[i].language[0] === 'Java') {
                  this.teamProjectLanguages[i].language[2] = "https://ignite.apache.org/images/java.png"
                } else if (this.teamProjectLanguages[i].language[0] === 'Ruby') {
                  this.teamProjectLanguages[i].language[2] = "http://nicholasjohnson.com/images/sections/ruby.png"
                }
              }
              return projectLanguages;
             });
          
          this.teamService.fetchProjectForks(this.teamProjectId, this.teamName, this.teamRepo)
            .subscribe(projectForks => {
              this.teamProjectForks = projectForks;
              return projectForks;
          });

          this.teamService.fetchProjectReadme(this.teamProjectId, this.teamName, this.teamRepo)
            .subscribe(projectReadme => {
              this.teamProjectReadme = projectReadme;
              return projectReadme;
          });
          return teamProjectInfo;
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
          let tempBranchesByContributor = [];
          for (let contrib in store)  {
            tempBranchesByContributor.push(store[contrib]);
          }
          this.branchesByContributor = tempBranchesByContributor;
          this.teamProjectBranches = projectBranches
          return projectBranches;
      });
    });
  }
}
