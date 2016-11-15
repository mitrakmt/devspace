import { Component, OnInit, DoCheck } from '@angular/core';
import { ProjectDashboardService } from './project-dashboard.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: `
    <app-search></app-search>

    <div>
      <h3>Project Info</h3>
      Name: {{projectInfo?.name}}
      Deadline: {{projectInfo?.deadline}}
      Github url: {{projectInfo?.url}}
    </div>

    <div>
      <h3>Forks</h3>
      <p *ngFor="let fork of projectForks">
        {{fork?.owner}}
        Github url: {{fork?.html_url}}
      </p>
    </div>

    <div>
      <h3>Contributors</h3>
      <p *ngFor="let contributor of projectContributors">
        {{contributor?.login}}
        Github url: {{contributor?.avatar}}
        {{contributor?.contributions}}
      </p>
    </div>

    <div>
      <h3>Languages</h3>
      <p *ngFor="let lang of projectLanguages">
      {{lang.language[0]}}:{{lang.language[1]}}
      </p>
    </div>

    <div>
      <h3>Readme</h3>
      {{projectReadme?._body}}
    </div> 
    <app-project-commits [projectId]="projectId"></app-project-commits>
  `,
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  private projectId: number;
  private projectInfo = this.projectDashboardService.projectInfo;
  private branchSHA = '37e7f629e751fa0b0a079fb623a825fd0283c913';
  private projectCommits;
  private projectForks;
  private owner;
  private repo;
  private projectContributors;
  private projectLanguages;
  private projectReadme;

  constructor(private route: ActivatedRoute, private projectDashboardService: ProjectDashboardService) { }

  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];

      this.projectDashboardService.fetchProjectInfo(this.projectId)
        .subscribe(projectInfo => {
          this.projectInfo = this.projectDashboardService.projectInfo;
          this.owner = this.projectDashboardService.owner;
          this.repo = this.projectDashboardService.repo;
          console.log('project info', this.projectInfo);
          return projectInfo;
        });
      
    this.projectDashboardService.fetchProjectForks(this.projectId)
      .subscribe(projectForks => {
        this.projectForks = projectForks;
        console.log('project forks', this.projectForks);
        return projectForks;
      });

    this.projectDashboardService.fetchProjectContributors(this.projectId)
      .subscribe(projectContributors => {
        this.projectContributors = projectContributors;
        console.log('project Contributors', this.projectContributors);
        return projectContributors;
      });

    this.projectDashboardService.fetchProjectLanguages(this.projectId)
      .subscribe(projectLanguages => {
        this.projectLanguages = projectLanguages;
        console.log('project Languages', this.projectLanguages);
        return projectLanguages;
      });

    this.projectDashboardService.fetchProjectReadme(this.projectId)
      .subscribe(projectReadme => {
        this.projectReadme = projectReadme;
        console.log('project Readme', this.projectReadme);
        return projectReadme;
      });

    });
  }
}
