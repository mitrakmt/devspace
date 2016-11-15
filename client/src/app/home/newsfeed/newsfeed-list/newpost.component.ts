import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NewsfeedListService } from './newsfeed-list.service';
import { NewsfeedPost } from '../newsfeed-post';

@Component({
  selector: 'app-newpost',
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
export class NewpostComponent {
  post = {'content': ''}
  newsfeedPosts: NewsfeedPost = null;
  constructor(private _newsfeedListService: NewsfeedListService) {  }
  onSubmit(form: NgForm) {
    let newPost = form.value.post
    form.reset()
    // console.log(newPost)
    this._newsfeedListService.sendNewsfeedUpdate(newPost)
      .subscribe(
        data => {
          console.log("post data===", data)
          this._newsfeedListService.newsfeedPosts.unshift(data)
          return data
          })
  }
}
