import { Component, Input } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NewsfeedListService } from './newsfeed-list.service';
import { NewsfeedComment } from '../newsfeed-comment';

@Component({
  selector: 'app-newsfeed-newcomment',
  template: `
      <form (ngSubmit)="onSubmit(f)" #f="ngForm" style="display: block; margin-bottom: 12px;">
        <div class="form-group">
          <label for="comment">Comment</label>
          <input 
            type="text"
            id="comment"
            class="searchfield"
            placeholder="Go ahead, type something!"
            style="width: 55%; padding: 6px;"
            name="comment"
            [(ngModel)]="comment.content"
            #comment = "ngModel"
            required
            >
            <button type="submit" md-button md-raised class="main-button" [disabled]="!f.valid">comment</button>
        </div>
      </form>
  `
})
export class NewcommentComponent{
  @Input("postId") postId: number;
  comment = {'content': ''}
  newsfeedComment: NewsfeedComment = null;

  constructor(private _newsfeedListService: NewsfeedListService) {  }

  onSubmit(form: NgForm) {
    let newComment = form.value.comment
    form.reset()
    this._newsfeedListService.sendNewComment(newComment, this.postId)
      .subscribe(
        data => {
          this._newsfeedListService.newsfeedPosts.map((post) =>{ 
            if(post['id'] === this.postId) {

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

              post['comments'].push(data)
            }
            return post
          })
        }
      )
    }
}
