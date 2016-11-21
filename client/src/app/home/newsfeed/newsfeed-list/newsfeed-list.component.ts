import { Component, OnInit } from '@angular/core';

import { NewsfeedListService } from './newsfeed-list.service';
import { NewsfeedPost } from '../newsfeed-post';

@Component({
  selector: 'app-newsfeed-list',
  template: `
        <div>NewsFeed</div>
        <hr>
        <app-newsfeed-newpost></app-newsfeed-newpost>
        <ul>
          <app-newsfeed-post *ngFor="let newsfeedPost of newsfeedListService.newsfeedPosts" [newsfeedPost]="newsfeedPost"></app-newsfeed-post>
        </ul>`
})
export class NewsfeedListComponent implements OnInit {
  newsfeedPosts: NewsfeedPost[] = [];
  private newsfeedComments
  constructor(private newsfeedListService: NewsfeedListService) { }

  ngOnInit() {
    let callback = (data) => this.newsfeedListService.newsfeedPosts.unshift(data)
    this.newsfeedListService.socketRecieve(callback)
    this.newsfeedListService.fetchNewsfeedUpdates()
      .subscribe(
        data => {
          let newArray = []
          let newData = data.map(post => {
            return post.content.split(' ').map(word => {
              if (word.indexOf('http') !== -1) {
                word = '<a href="' + word + '" target="_blank" class="link">' + word + '</a>'
              } else if (word.indexOf('www.') !== -1) {
                word = '<a href="http://' + word + '" target="_blank" class="link">' + word + '</a>'
              }
              return word
            }).join(' ');        
          })
          
          for (var i = 0; i < data.length; i++) {
            data[i].content = '<p>' + newData[i] + '</p>'
          }

          this.newsfeedPosts = data
          this.newsfeedListService.newsfeedPosts = data
          return data
        }
      )
  }
}
