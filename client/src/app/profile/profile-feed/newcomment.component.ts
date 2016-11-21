import { Component, Input } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProfileFeedService } from './profile-feed.service';
import { ProfileComment } from './profile-comment';

@Component({
  selector: 'app-profile-newcomment',
  template: `
      <form (ngSubmit)="onSubmit(f)" #f="ngForm" id="postform" >
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