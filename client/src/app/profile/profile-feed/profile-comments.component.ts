import { Component, Input, OnInit } from '@angular/core';
import { ProfileComment } from './profile-comment';
import { ProfileFeedService } from './profile-feed.service';


@Component({
  selector: 'app-profile-comments',
  template: `
        <md-card style="margin-bottom: 20px" md-padding md-margin>
         <div *ngFor="let comment of comments">
          <p style="font-size: 12px; font-color: gray; margin-bottom: 0px">{{comment.createdAt | date:'short'}}:</p>
          <p style="margin-left: 9px; font-size: 16px;">{{comment.username}}: {{comment.content}}</p>
         </div>           
        </md-card>`
})
export class ProfileCommentsComponent {
@Input('comments') comments: any;
  constructor(private _profileFeedService: ProfileFeedService) {
   }
  profileComments: ProfileComment[];
  
}
