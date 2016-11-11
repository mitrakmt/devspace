import { Component, OnInit, DoCheck } from '@angular/core';
import { ProjectDashboardService } from './project-dashboard.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: `
    <app-search></app-search>

    <div>
      <h3>Project Info</h3>
      Name: {{projectInfo.name}}
      Deadline: {{projectInfo.deadline}}
      Github url: {{projectInfo.url}}
    </div>

    <div>
      <h3>Forks</h3>
      <p *ngFor="let fork of projectForks">
        {{fork.owner}}
        Github url: {{fork.html_url}}
      </p>
    </div>

    <div>
      <h3>Contributors</h3>
      <p *ngFor="let contributor of projectContributors">
        {{contributor.login}}
        Github url: {{contributor.avatar}}
        {{contributor.contributions}}
      </p>
    </div>

    <div>
      <h3>Languages</h3>
      <p *ngFor="let contributor of projectContributors">
        {{contributor}}:{{projectContributors.cont}}
        Github url: {{contributor.avatar}}
        {{contributor.contributions}}
      </p>
    </div>  
  `,
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  private projectId: number;
  private projectInfo = 'test';
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
          this.projectInfo = projectInfo;
          this.owner = projectInfo.owner;
          this.repo = projectInfo.name;
          console.log('project info', this.projectInfo);
          return projectInfo;
        });
      
      // this.projectDashboardService.fetchProjectCommits(this.projectId)
      //   .subscribe(projectInfo => {
      //     this.projectInfo = projectInfo;
      //     console.log('project commits', this.projectInfo);
      //     return projectInfo;
      //   });

    this.projectDashboardService.fetchProjectForks(this.projectId, this.owner, this.repo)
      .subscribe(projectForks => {
        this.projectForks = projectForks;
        console.log('project forks', this.projectForks);
        return projectForks;
      });

    this.projectDashboardService.fetchProjectContributors(this.projectId, this.owner, this.repo)
      .subscribe(projectContributors => {
        this.projectContributors = projectContributors;
        console.log('project Contributors', this.projectContributors);
        return projectContributors;
      });

    this.projectDashboardService.fetchProjectLanguages(this.projectId, this.owner, this.repo)
      .subscribe(projectLanguages => {
        this.projectLanguages = projectLanguages;
        console.log('project Languages', this.projectLanguages);
        return projectLanguages;
      });

    // this.projectDashboardService.fetchProjectReadme(this.projectId, this.owner, this.repo)
    //   .subscribe(projectReadme => {
    //     this.projectReadme = projectReadme;
    //     console.log('project Readme', this.projectReadme);
    //     return projectReadme;
    //   });

    });
  }
}
