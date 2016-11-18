import { Component, OnInit } from '@angular/core';
import { ProjectSidebarService } from './project-sidebar.service'
import { Observable } from 'rxjs/Observable';
import { ProjectSidebarListService } from './project-sidebar-list/project-sidebar-list.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-project-sidebar',
  templateUrl: './project-sidebar.component.html',
  styleUrls: ['./project-sidebar.component.css']
})
export class ProjectSidebarComponent implements OnInit {
  sidebarProjects;
  project = {'name': ''}

  constructor(private projectSidebarService: ProjectSidebarService, private projectSidebarListService: ProjectSidebarListService) { }

    onSubmit(form: NgForm) {
        let projectName = form.value.project;
        let userId = localStorage.getItem('userid');
        form.reset()
        this.projectSidebarService.importProject(userId, projectName)
          .subscribe(
            data => {
              this.projectSidebarListService.sidebarProjects.push(data.name)
      })
    }

  ngOnInit() {
    
  }

}
