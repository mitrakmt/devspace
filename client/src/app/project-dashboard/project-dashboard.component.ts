import { Component, OnInit, DoCheck } from '@angular/core';
import { ProjectDashboardService } from './project-dashboard.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  private projectId: number;
  private projectInfo;

  constructor(private route: ActivatedRoute, private projectDashboardService: ProjectDashboardService) { }

  ngOnInit() {
    return this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
      console.log('projectId', (typeof this.projectId));
      // return this.projectId;
      this.projectDashboardService.fetchProjectInfo(this.projectId)
        .subscribe(projectInfo => {
          console.log('project info', projectInfo);
          return projectInfo
        })
    })

      // this.projectDashboardService.fetchProjectInfo(this.projectId)
      //   .subscribe(
      //     (data) => {
      //       console.log('project info', data);
      //       this.projectInfo = data;
      //       console.log('projectInfo', data)
      //       return data;
      //     }
      // );

  }
}
