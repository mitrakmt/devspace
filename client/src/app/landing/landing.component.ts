import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <div>
      <h1>sup</h1>
      <app-navbar></app-navbar>
      <app-main></app-main>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
