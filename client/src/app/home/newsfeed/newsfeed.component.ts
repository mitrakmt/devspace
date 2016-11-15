import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed',
  template:`
      <div>
        <app-newsfeed-list></app-newsfeed-list>
      </div>`
})
export class NewsfeedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
