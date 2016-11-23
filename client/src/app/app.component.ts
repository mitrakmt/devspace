/// <reference path="../../typings/globals/socket.io-client/index.d.ts" />
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
      
      <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'app works!';
}
