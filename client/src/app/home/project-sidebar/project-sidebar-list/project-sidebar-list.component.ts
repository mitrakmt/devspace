import { Component, OnInit } from '@angular/core';
import { ProjectSidebarListService } from './project-sidebar-list.service'

@Component({
  selector: 'app-project-sidebar-list',
  templateUrl: './project-sidebar-list.component.html'
})
export class ProjectSidebarListComponent implements OnInit {

  constructor(private projectSidebarListService: ProjectSidebarListService) { }

  ngOnInit() {
    this.projectSidebarListService.getSidebarProjects()
      .subscribe(
        (data) => {
          this.projectSidebarListService.sidebarProjects = data;
        }
    );
  }

}
