import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProfileFeedService } from './profile-feed.service';
import { ProfilePost } from './profile-post';

@Component({
  selector: 'app-profile-newpost',
  template: `
    <form (ngSubmit)="onSubmit(f)" #f="ngForm" id="postform">
      <h3 style="margin-left: 38px;">New Post</h3>
      <div class="form-group" style="width: 100%;">
        <input 
          type="text"
          id="post"
          class="searchfield"
          placeholder="What's on your mind?"
          style="width: 70%; padding: 6px; margin-left: 38px;"
          name="post"
          [(ngModel)]="post.content"
          #post = "ngModel"
          required
          >
          <button type="submit" md-button md-raised class="main-button" [disabled]="!f.valid">post</button>
      </div>
    </form>`
})
export class ProfileNewPostComponent {
  post = {'content': ''}
  profilePosts: ProfilePost = null;
  constructor(private _profileFeedService: ProfileFeedService) {  }
  
  onSubmit(form: NgForm) {
    let newPost = form.value.post
    form.reset()
    this._profileFeedService.sendNewPost(newPost)
      .subscribe(
        data => {
          data.comments = []

          let newArray = []
          let newData = data.content.split(' ').map(word => {
            if (word.indexOf('www.') !== -1 || word.indexOf('.com') !== -1) {
              word = '<a src="' + word + '" target="_blank" class="link">' + word + '</a>'
            } else if (word === ':)') {
              word = ':smiley:'
            } else if (word === '<3') {
              word = ':heart:'
            }
            return word
          }).join(' ');      
        
          data.content = '<p>' + newData + '</p>'

          this._profileFeedService.profilePosts.unshift(data)
          return data
      })
  }
}
