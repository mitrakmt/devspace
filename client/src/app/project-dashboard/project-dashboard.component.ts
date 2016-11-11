import { Component, OnInit, DoCheck } from '@angular/core';
import { ProjectDashboardService } from './project-dashboard.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: `
    <app-search></app-search>
    <p>
      project-dashboard works!
      Name: {{projectInfo.name}}
      Deadline: {{projectInfo.deadline}}
      Github url: {{projectInfo.url}}
    </p>
    
  `,
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  private projectId: number;
  projectInfo = 'test';

  constructor(private route: ActivatedRoute, private projectDashboardService: ProjectDashboardService) { }

  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];

      this.projectDashboardService.fetchProjectInfo(this.projectId)
        .subscribe(projectInfo => {
          this.projectInfo = projectInfo;
          console.log('project info', this.projectInfo);
          return projectInfo;
        });
      
      this.projectDashboardService.fetchProjectCommits(this.projectId)
        .subscribe(projectInfo => {
          this.projectInfo = projectInfo;
          console.log('project commits', this.projectInfo);
          return projectInfo;
        });
    });
  }
}
