import { Component, OnInit } from '@angular/core';

import { Newspost } from '../newspost';
// import {} from './newsfeed-item.component'
@Component({
  selector: 'app-newsfeed-list',
  templateUrl: './newsfeed-list.component.html'
})
export class NewsfeedListComponent implements OnInit {
  newsfeedposts: Newspost[] = [
    new Newspost('Davidkim310', 'hello devspace!'),
    new Newspost('dfle', '#2')
  ];
  constructor() { }

  ngOnInit() {
  }

}
