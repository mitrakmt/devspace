import { Component, Input, OnInit, AfterContentInit, OnChanges } from '@angular/core';
import { ProjectDashboardService } from '../project-dashboard.service';
@Component({
  selector: 'app-project-commits',
  templateUrl: './project-commits.component.html',
  styleUrls: ['./project-commits.component.css']
})
export class ProjectCommitsComponent implements OnInit {
  @Input() projectId: any;
  //private projectId = this.projectDashboardService.projectId
  private branch = 'master';
  private projectCommits;

  constructor(private projectDashboardService: ProjectDashboardService) { }

  ngOnInit() {
    this.projectDashboardService.fetchProjectCommits(this.projectId, this.branch)
      .subscribe(projectCommits => {
        this.projectCommits = projectCommits;
        return projectCommits;
      });
  }

}
