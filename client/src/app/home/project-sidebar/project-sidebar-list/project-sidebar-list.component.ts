import { Component, OnInit } from '@angular/core';
import { ProjectSidebarListService } from './project-sidebar-list.service'
import { Project } from '../project';

@Component({
  selector: 'app-project-sidebar-list',
  templateUrl: './project-sidebar-list.component.html'
})
export class ProjectSidebarListComponent implements OnInit {
  sidebarProjects: Project[] = [];
  constructor(private projectSidebarListService: ProjectSidebarListService) { }

  ngOnInit() {
    this.projectSidebarListService.getSidebarProjects()
      .subscribe(
        (data) => {
          console.log('project sidebar data', data);
          this.sidebarProjects = data;
          return data;
        }
    );
  }

}
