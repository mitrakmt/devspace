import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProfileFeedService } from './profile-feed.service';
import { ProfilePost } from './profile-post';

@Component({
  selector: 'app-profile-newpost',
  template: `
      <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <h3 style="margin-left: 38px;">New Post</h3>
        <div class="form-group" style="width: 100%;">
          <input 
            type="text"
            id="post"
            placeholder="What's on your mind?"
            style="width: 70%; padding: 10px; margin-left: 38px;"
            name="post"
            [(ngModel)]="post.content"
            #post = "ngModel"
            required
            >
            <button type="submit" class="btn btn-primary" [disabled]="!f.valid">post</button>
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
          this._profileFeedService.profilePosts.unshift(data)
          return data
          })
  }
}
