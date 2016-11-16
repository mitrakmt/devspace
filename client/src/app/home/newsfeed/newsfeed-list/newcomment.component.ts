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
            name="comment"
            [(ngModel)]="comment.content"
            #comment = "ngModel"
            required
            >
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="!f.valid">comment</button>
      </form>
  `
})
export class NewcommentComponent{
  @Input("postId") postId: number;
  comment = {'content': ''}
  newsfeedComment: NewsfeedComment = null;

  constructor(private _newsfeedListService: NewsfeedListService) {  }
  onSubmit(form: NgForm) {
    // console.log("postid in submit", this.postId)
    let newComment = form.value.comment
    form.reset()
    // console.log(newComment)
    this._newsfeedListService.sendNewComment(newComment, this.postId)
      .subscribe(
        data => {
          // console.log("comment data===", data)
          this._newsfeedListService.newsfeedPosts.map((post)=>{
            console.log("post is", post)
          if(post.id === this.postId){
            post.comments.unshift(data)
          }
          return post
          })
  })
}
}