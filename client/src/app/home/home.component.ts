import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
        <app-search></app-search>
        <div class="row">
          <div class="col-sm-5"><app-newsfeed></app-newsfeed></div>
          <div class="col-sm-5"><app-github></app-github></div>
          <div class="col-sm-2"><app-projects></app-projects></div>
        </div>
  `
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
