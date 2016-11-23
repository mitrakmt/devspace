import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NewsfeedListService } from './newsfeed-list.service';
import { NewsfeedPost } from '../newsfeed-post';

// shouldn't this be deleted?

@Component({
  selector: 'app-newpost',
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
      </form>
  `
})
export class NewpostComponent {
  post = {'content': ''}
  newsfeedPosts: NewsfeedPost = null;
  constructor(private _newsfeedListService: NewsfeedListService) {  }
  onSubmit(form: NgForm) {
    let newPost = form.value.post
    form.reset()
    this._newsfeedListService.sendNewsfeedUpdate(newPost)
      .subscribe(
        data => {
          data.comments = []
          


          // this._newsfeedListService.newsfeedPosts.unshift(data)
          return data
          })
  }
}
