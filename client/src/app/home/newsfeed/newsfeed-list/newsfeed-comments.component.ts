import { Component, Input, OnInit } from '@angular/core';
import { NewsfeedComment } from '../newsfeed-comment';
import { NewsfeedListService } from './newsfeed-list.service';


@Component({
  selector: 'app-newsfeed-comments',
  template: `
        <md-card style="margin-bottom: 20px; background-color: #F8F8F8;" md-padding md-margin>
          <div *ngFor="let comment of comments" style="border-bottom: 1px solid lightgray; margin-bottom: 10px;">
            <p style="margin-left: 9px; font-size: 16px;"> {{ comment.firstName }} {{ comment.lastName }} <a [routerLink]="['/dev', comment.username]"><strong>{{comment.username}}</strong></a>:</p>
            <p style="margin-left: 9px; font-size: 16px;"> {{comment.content | emojify }} </p>
            <p style="font-size: 11px; margin-top: -5px; font-color: gray; margin-bottom: 0px">{{comment.createdAt | date:'short'}}</p>
          </div>       
        </md-card>`
})
export class NewsfeedCommentsComponent implements OnInit {
@Input('comments') comments: any;
  constructor(private newsfeedListService: NewsfeedListService) {
   }
  newsfeedComments: NewsfeedComment[];
  ngOnInit() {
    // console.log("comments", this.comments)
  }
}
