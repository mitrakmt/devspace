import { Component, OnInit, Input } from '@angular/core';

import { Newspost } from '../newspost';
@Component({
  selector: 'app-newsfeed-item',
  templateUrl: './newsfeed-item.component.html'
})
export class NewsfeedItemComponent implements OnInit {
  @Input() newsfeedpost: Newspost;
  newsfeedId: number;
  constructor() { }

  ngOnInit() {
  }

}
