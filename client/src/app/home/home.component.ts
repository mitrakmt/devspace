import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service'

@Component({
  selector: 'app-home',
  template: `
        <app-search></app-search>
        <div class="row">
          <div class="col-sm-5"><app-newsfeed></app-newsfeed></div>
          <div class="col-sm-5"><app-github></app-github></div>
          <div class="col-sm-2"><app-project-sidebar></app-project-sidebar></div>
        </div>
        <router-outlet></router-outlet>
  `
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.test()
      .subscribe(
        (name) => {
          console.log(name)
        }
      )
  }

}
