import { Component, OnInit } from '@angular/core';
import { ProjectSidebarService } from './project-sidebar.service'
import { Observable } from 'rxjs/Observable';
import { ProjectSidebarListService } from './project-sidebar-list/project-sidebar-list.service';
import { NgForm } from "@angular/forms";
import { Project } from './project';

@Component({
  selector: 'app-project-sidebar',
  styleUrls: ['./project-sidebar.component.css'],
  template: `
        <app-project-sidebar-list></app-project-sidebar-list>
        <div class="dropdown">
          <button class="dropbtn">Import Github Project</button>
          <div class="dropdown-content">
            <md-input class="add-project-input" placeholder="Import project" type="text" [value]="project" (input)="project = $event.target.value"></md-input>
            <button md-button md-raised (click)="importProject(project)" class="main-button">Import</button>
          </div>
        </div>
  `
})
export class ProjectSidebarComponent implements OnInit {
  sidebarProjects: Project[] = [];

  constructor(private projectSidebarService: ProjectSidebarService, private projectSidebarListService: ProjectSidebarListService) { }

    importProject  = (projectName) => {
        let userId = localStorage.getItem('userid');
        this.projectSidebarService.importProject(userId, projectName)
          .subscribe(
            data => {
              this.projectSidebarListService.sidebarProjects.unshift(data)
              this.sidebarProjects.unshift(data)
          })
    }

  ngOnInit() {
    
  }

}
