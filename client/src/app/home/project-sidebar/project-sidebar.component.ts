import { Component, OnInit } from '@angular/core';
import { ProjectSidebarService } from './project-sidebar.service'
import { Observable } from 'rxjs/Observable';
import { ProjectSidebarListService } from './project-sidebar-list/project-sidebar-list.service';
import { NgForm } from "@angular/forms";
import { Project } from './project';

@Component({
  selector: 'app-project-sidebar',
  templateUrl: './project-sidebar.component.html',
  styleUrls: ['./project-sidebar.component.css']
})
export class ProjectSidebarComponent implements OnInit {
  sidebarProjects: Project[] = [];

  constructor(private projectSidebarService: ProjectSidebarService, private projectSidebarListService: ProjectSidebarListService) { }

    importProject  = (projectName) => {
        let userId = localStorage.getItem('userid');
        this.projectSidebarService.importProject(userId, projectName)
          .subscribe(
            data => {
              this.projectSidebarListService.sidebarProjects.push(data.name)
              this.sidebarProjects.push(data.name)
      })
    }

  ngOnInit() {
    
  }

}
