import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NewsfeedListService } from './newsfeed-list.service';
import { NewsfeedPost } from '../newsfeed-post';

@Component({
  selector: 'app-newsfeed-newpost',
  styleUrls: ['./newsfeed-newpost.component.css'],
  template: `
    <form (ngSubmit)="onSubmit(f)" #f="ngForm" id="postform">
      <h3 style="margin-left: 38px;">New Post</h3>
      <div class="form-group" style="width: 100%;">
        <input 
          type="text"
          id="post"
          class="searchfield"
          placeholder="What's on your mind?"
          style="width: 70%; padding: 0; padding-left: 7px;margin-left: 38px;"
          name="post"
          [(ngModel)]="post.content"
          #post = "ngModel"
          required
          >
          <button type="submit" md-button md-raised class="main-button" [disabled]="!f.valid">post</button>
      </div>
    </form>`
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

          let newData = data.content.split(' ').map(word => {
            if (word.indexOf('www.') !== -1 || word.indexOf('.com') !== -1) {
              word = '<a src="' + word + '" target="_blank" class="link">' + word + '</a>'
            } else if (word === ':)') {
              word = ':smiley:'
            } else if (word === '<3') {
              word = ':heart:'
            }
            // Convert the above to an emoji object
            return word
          }).join(' ');      
        
          data.content = '<p>' + newData + '</p>'

          return data
      })
  }
}
