import { Component, OnInit, Input } from '@angular/core';

import { NewsfeedPost } from '../newsfeed-post';
@Component({
  selector: 'app-newsfeed-post',
  templateUrl: './newsfeed-post.component.html'
})
export class NewsfeedPostComponent implements OnInit {
  @Input() newsfeedPost: NewsfeedPost;
  newsfeedId: number;
  constructor() { }

  ngOnInit() {
  }

}
