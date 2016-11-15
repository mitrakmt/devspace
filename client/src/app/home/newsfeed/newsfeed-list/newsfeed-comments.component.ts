import { Component, Input, OnInit } from '@angular/core';
import { NewsfeedComment } from '../newsfeed-comment';
import { NewsfeedListService } from './newsfeed-list.service';


@Component({
  selector: 'app-newsfeed-comments',
  template: `
        <md-card style="margin-bottom: 20px" md-padding md-margin>
         <div *ngFor="let comment of comments">
          <p>{{comment.username}}: {{comment.content}}</p>
         </div>           
        </md-card>`
})
export class NewsfeedCommentsComponent {
@Input('comments') comments: any;
  constructor(private newsfeedListService: NewsfeedListService) {
   }
  newsfeedComments: NewsfeedComment[];
  
}
