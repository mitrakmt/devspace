import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-project-sidebar-item',
  templateUrl: './project-sidebar-item.component.html'
})
export class ProjectSidebarItemComponent implements OnInit {
  @Input() project: Project;
  projectId: number;
  constructor() { }

  ngOnInit() {
  }

}
