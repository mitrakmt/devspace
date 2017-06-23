import { Component, Input } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProfileFeedService } from './profile-feed.service';
import { ProfileComment } from './profile-comment';

@Component({
  selector: 'app-profile-newcomment',
  template: `
    
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
        })
    }
  }