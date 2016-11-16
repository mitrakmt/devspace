import { Component, OnInit } from '@angular/core';
import { ProjectSidebarService } from './project-sidebar.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-project-sidebar',
  templateUrl: './project-sidebar.component.html',
  styleUrls: ['./project-sidebar.component.css']
})
export class ProjectSidebarComponent implements OnInit {

  constructor(private projectSidebarService: ProjectSidebarService) { 
    // this.projectSidebarService.addProject = ():Observable<any> => {
    //   console.log('project sidebar asdf');
    //   let baseball = 'baseball'
    //   return baseball
    // }
  }

  ngOnInit() {
    
  }

}
