import { Component, Input, OnInit } from '@angular/core';
import { NewsfeedComment } from '../newsfeed-comment';
import { NewsfeedListService } from './newsfeed-list.service';


@Component({
  selector: 'app-newsfeed-comments',
  template: `
        <md-card style="margin-bottom: 20px" md-padding md-margin>
         <div *ngFor="let comment of comments">
          <p style="font-size: 12px; font-color: gray; margin-bottom: 0px">{{comment.createdAt | date:'short'}}:</p>
          <p style="margin-left: 9px; font-size: 16px;">{{comment.username}}: {{comment.content}}</p>
         </div>           
        </md-card>`
})
export class NewsfeedCommentsComponent {
@Input('comments') comments: any;
  constructor(private newsfeedListService: NewsfeedListService) {
   }
  newsfeedComments: NewsfeedComment[];
  
}
