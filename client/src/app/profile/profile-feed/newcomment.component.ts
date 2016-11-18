import { Component, Input } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProfileFeedService } from './profile-feed.service';
import { ProfileComment } from './profile-comment';

@Component({
  selector: 'app-profile-newcomment',
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
export class ProfileNewCommentComponent{
  @Input("postId") postId: number;
  comment = {'content': ''}
  profileComment: ProfileComment = null;

  constructor(private _profileFeedService: ProfileFeedService) {  }
  onSubmit(form: NgForm) {
    let newComment = form.value.comment
    form.reset()
    this._profileFeedService.sendNewComment(newComment, this.postId)
      .subscribe(
        data => {
          this._profileFeedService.profilePosts.map((post)=>{
          if(post['id'] === this.postId){
            post['comments'].unshift(data)
          }
          return post
          })
  })
}
}