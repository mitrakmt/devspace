import { Component, OnInit } from '@angular/core';

import { NewsfeedListService } from './newsfeed-list.service';
import { NewsfeedPost } from '../newsfeed-post';

@Component({
  selector: 'app-newsfeed-list',
  template: `
        <div>NewsFeed</div>
        <hr>
        <app-newpost></app-newpost>
        <ul>
          <app-newsfeed-post *ngFor="let newsfeedPost of newsfeedListService.newsfeedPosts" [newsfeedPost]="newsfeedPost"></app-newsfeed-post>
        </ul>`
})
export class NewsfeedListComponent implements OnInit {
  newsfeedPosts: NewsfeedPost[] = [];
  private newsfeedComments
  constructor(private newsfeedListService: NewsfeedListService) { }

  ngOnInit() {
    this.newsfeedListService.fetchNewsfeedUpdates()
      .subscribe(
        data => {
          this.newsfeedPosts = data
          this.newsfeedListService.newsfeedPosts = data
          console.log("newsfeedserviceposts", this.newsfeedListService.newsfeedPosts)
          return data
        }
      )
  }

}
