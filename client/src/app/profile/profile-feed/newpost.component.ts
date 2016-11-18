import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProfileFeedService } from './profile-feed.service';
import { ProfilePost } from './profile-post';

@Component({
  selector: 'app-profile-newpost',
  template: `
      <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <div class="form-group">
          <label for="post">Post</label>
          <input 
            type="text"
            id="post"
            name="post"
            [(ngModel)]="post.content"
            #post = "ngModel"
            required
            >
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="!f.valid">post</button>
      </form>
  `
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
