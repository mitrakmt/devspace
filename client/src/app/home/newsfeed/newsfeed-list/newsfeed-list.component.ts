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

  // convertLink = (data) => {
  //   let newData = data.map(post => {
  //     return post.content.split(' ').map(word => {
  //       if (word.indexOf('http') !== -1) {
  //         word = '<a href="' + word + '" target="_blank" class="link">' + word + '</a>'
  //       } else if (word.indexOf('www.') !== -1) {
  //         word = '<a href="http://' + word + '" target="_blank" class="link">' + word + '</a>'
  //       }
  //       return word
  //     }).join(' ');        
  //   })
    
  //   for (var i = 0; i < data.length; i++) {
  //     data[i].content = '<p>' + newData[i] + '</p>'
  //   }
  //   console.log("data is covertLink", data)
  //   return data
  // }
  
  ngOnInit() {
    let callback = (data) => {
      // let newData = this.convertLink(data)
      // console.log("newdata--->", newData)
      this.newsfeedListService.newsfeedPosts.unshift(data)
    }
    this.newsfeedListService.socketRecieve(callback)
    this.newsfeedListService.fetchNewsfeedUpdates()
      .subscribe(
        data => {
          let userId = localStorage.getItem('userid')
          // let newArray = []
          // this.convertLink(data)
          console.log("DATA IN NF POSTS", data)
          for (var i = 0; i < data.length; i++) {
            data[i].liked = false
            for (var j = 0; j < data[i].interactions.length; j++) {
              if (data[i].interactions[j].userId == userId) {
                data[i].liked = true
                console.log("Liked post", data[i])
              }
            }
          }

          this.newsfeedPosts = data
          this.newsfeedListService.newsfeedPosts = data
          return data
        }
      )
  }
}
