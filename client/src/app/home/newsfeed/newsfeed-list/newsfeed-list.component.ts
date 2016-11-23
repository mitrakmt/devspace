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
  secondaryList: NewsfeedPost[] = [];

  private newsfeedComments
  constructor(private newsfeedListService: NewsfeedListService) { }

  convertLink = (data) => {
    let tempArray = [];
    let newData = data.map(post => {

      let newComments = post.comments.map(comment => {
        return comment.content.split(' ').map(word => {
          if (word.indexOf('http') !== -1) {
            word = '<a href="' + word + '" target="_blank" class="link">' + word + '</a>'
          } else if (word.indexOf('www.') !== -1) {
            word = '<a href="http://' + word + '" target="_blank" class="link">' + word + '</a>'
          } else if (word === ':)') {
            word = ':smiley:'
          } else if (word === '<3') {
            word = ':heart:'
          }   
          return word             
        }).join(' '); 
      })

      for (var i = 0; i < post.comments.length; i++) {
        post.comments[i].content = '<p>' + newComments[i] + '</p>'
      }

      return post.content.split(' ').map(word => {
        if (word.indexOf('http') !== -1) {
          word = '<a href="' + word + '" target="_blank" class="link">' + word + '</a>'
        } else if (word.indexOf('www.') !== -1) {
          word = '<a href="http://' + word + '" target="_blank" class="link">' + word + '</a>'
        } else if (word === ':)') {
          word = ':smiley:'
        } else if (word === '<3') {
          word = ':heart:'
        }
        return word
      }).join(' ');        
    })
    
    for (var i = 0; i < data.length; i++) {
      data[i].content = '<p>' + newData[i] + '</p>'
    }
    return data
  }

  // This will show 25 more posts below the first list
  // showSecondaryList = () => {
  //   this.newsfeedPosts = this.newsfeedPosts.concat(this.secondaryList)
  // }
  
  ngOnInit() {

    let callback = (data) => {
      let newData = data.content.split(' ').map(word => {
        if (word.indexOf('http') !== -1) {
          word = '<a href="' + word + '" target="_blank" class="link">' + word + '</a>'
        } else if (word.indexOf('www.') !== -1) {
          word = '<a href="http://' + word + '" target="_blank" class="link">' + word + '</a>'
        } else if (word === ':)') {
          word = ':smiley:'
        } else if (word === '<3') {
          word = ':heart:'
        }

        return word
      }).join(' ');        
    
      data.content = '<p>' + newData + '</p>'

      this.newsfeedListService.newsfeedPosts.unshift(data)
    }

    this.newsfeedListService.socketRecieve(callback)
    this.newsfeedListService.fetchNewsfeedUpdates()
      .subscribe(
        data => {
          let userId = localStorage.getItem('userid')
          let newArray = []
          this.convertLink(data)

          for (var i = 0; i < data.length; i++) {
            data[i].liked = false
            for (var j = 0; j < data[i].interactions.length; j++) {
              if (data[i].interactions[j].userId == userId) {
                data[i].liked = true
              }
            }
          }

          this.newsfeedPosts = data
          this.newsfeedListService.newsfeedPosts = data

          // Use these when we do pagination
          // this.secondaryList = data.slice(25)
          // this.newsfeedPosts = data.slice(0, 25)

          // this.newsfeedListService.secondaryList = data.slice(25)
          // this.newsfeedListService.newsfeedPosts = data.splice(0, 25)

          return data
        }
      )
  }
}
