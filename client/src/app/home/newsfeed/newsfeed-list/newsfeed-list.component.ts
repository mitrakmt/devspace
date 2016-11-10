import { Component, OnInit } from '@angular/core';

import { NewsfeedListService } from './newsfeed-list.service';
import { NewsfeedPost } from '../newsfeed-post';

@Component({
  selector: 'app-newsfeed-list',
  templateUrl: './newsfeed-list.component.html'
})
export class NewsfeedListComponent implements OnInit {
  newsfeedPosts: NewsfeedPost[] = [];

  constructor(private newsfeedListService: NewsfeedListService) { }

  ngOnInit() {
    this.newsfeedListService.fetchNewsfeedUpdates()
      .subscribe(
        data => {
          console.log('newsfeed data', data)
          this.newsfeedPosts = data
          return data
        }
      )
  }

}
