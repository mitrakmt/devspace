import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';

@Component({
  selector: 'app-landing',
  template: `
    <div>
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
