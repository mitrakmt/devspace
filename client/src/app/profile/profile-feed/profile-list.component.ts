import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileFeedService } from './profile-feed.service';
import { ProfilePost } from './profile-post';

@Component({
  selector: 'app-profile-list',
  template: `
        <h1 style="text-align: center;">Posts</h1>
        <hr>
        <app-profile-newpost *ngIf="username === currentUser"></app-profile-newpost>
        <ul>
          <app-profile-post *ngFor="let profilePost of _profileFeedService.profilePosts" [profilePost]="profilePost"></app-profile-post>
        </ul>`
})
export class ProfileListComponent implements OnInit {

  username = this.router.url.slice(5);
  currentUser = localStorage.getItem('username');

  profilePosts: ProfilePost[] = [];
  following = []
  private profileComments

  constructor(private _profileFeedService: ProfileFeedService, public router: Router) { }

  ngOnInit() {
    this.profilePosts = []
    this._profileFeedService.profilePosts = []
    let username = this.router.url.slice(5);
    let currentUser = localStorage.getItem('username');
    let userid = localStorage.getItem('userid')

    this._profileFeedService.fetchProfileFeed()
      .subscribe(
        data => { 
          let userId = localStorage.getItem('userid')
          let newArray = []

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

          for (var i = 0; i < data.length; i++) {
            data[i].liked = false
            for (var j = 0; j < data[i].interactions.length; j++) {
              if (data[i].interactions[j].userId == userId) {
                data[i].liked = true
              }
            }
          }

          this.profilePosts = data
          this._profileFeedService.profilePosts = data
          return data
        }
      )
 
  }
}
