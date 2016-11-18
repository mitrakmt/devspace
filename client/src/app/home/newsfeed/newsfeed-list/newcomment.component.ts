import { Component, Input } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NewsfeedListService } from './newsfeed-list.service';
import { NewsfeedComment } from '../newsfeed-comment';

@Component({
  selector: 'app-newcomment',
  template: `
      <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <div class="form-group">
          <label for="comment">Comment</label>
          <input 
            type="text"
            id="comment"
            style="width: 55%;"
            name="comment"
            [(ngModel)]="comment.content"
            #comment = "ngModel"
            required
            >
            <button type="submit" class="btn btn-primary" [disabled]="!f.valid">comment</button>
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
          if(post['id'] === this.postId){
            post['comments'].unshift(data)
          }
          return post
          })
  })
}
}