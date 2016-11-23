import { Component, Input, OnInit } from '@angular/core';
import { NewsfeedComment } from '../newsfeed-comment';
import { NewsfeedListService } from './newsfeed-list.service';


@Component({
  selector: 'app-newsfeed-comments',
  styleUrls: ['./newsfeed-comments.component.css'],
  template: `
        <md-card class="comment-card" md-padding md-margin>
          <div *ngFor="let comment of comments" style="border-bottom: 1px solid lightgray; margin-bottom: 10px;">
            <p class="comment-names"> {{ comment.firstName }} {{ comment.lastName }} <a [routerLink]="['/dev', comment.username]" style="color: #2ea890" ><strong>{{comment.username}}</strong></a>:</p>
            <p class="comment-content" [innerHTML]="comment.content | emojify"></p>
            <p class="comment-time">{{comment.createdAt | date:'short'}}</p>
          </div>       
        </md-card>`
})
export class NewsfeedCommentsComponent implements OnInit {
@Input('comments') comments: any;
  constructor(private newsfeedListService: NewsfeedListService) {
   }
  newsfeedComments: NewsfeedComment[];
  ngOnInit() { }
}
