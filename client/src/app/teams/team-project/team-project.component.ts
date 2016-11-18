import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-project',
  template:`
    <app-search></app-search>
    team-project works!
  `,
  styleUrls: ['./team-project.component.css']
})
export class TeamProjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
