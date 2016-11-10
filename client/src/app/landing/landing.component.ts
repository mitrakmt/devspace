import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <app-navbar></app-navbar>
    <app-main></app-main>
  `,
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
