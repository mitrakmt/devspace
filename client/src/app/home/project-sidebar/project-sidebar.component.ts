import { Component, OnInit } from '@angular/core';
import { ProjectSidebarService } from './project-sidebar.service'

@Component({
  selector: 'app-projects',
  templateUrl: './project-sidebar.component.html'
})
export class ProjectSidebarComponent implements OnInit {

  constructor(private projectSidebarService: ProjectSidebarService) { }

  ngOnInit() {
    this.projectSidebarService.getSidebarProjects()
    .subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

}
