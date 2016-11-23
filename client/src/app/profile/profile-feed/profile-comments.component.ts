import { Component, Input, OnInit } from '@angular/core';
import { ProfileComment } from './profile-comment';
import { ProfileFeedService } from './profile-feed.service';


@Component({
  selector: 'app-profile-comments',
  template: `
        <md-card style="margin-bottom: 20px; background-color: #F8F8F8;" md-padding md-margin>
          <div *ngFor="let comment of comments" style="border-bottom: 1px solid lightgray; margin-bottom: 10px;">
            <p style="margin-left: 9px; font-size: 16px;"> {{ comment.firstName }} {{ comment.lastName }} <a [routerLink]="['/dev', comment.username]" class="link"><strong>{{comment.username}}</strong></a>:</p>
            <p style="margin-left: 9px; font-size: 16px; padding: 4px; border: 1px solid #DEDEDE;" [innerHTML]="comment.content | emojify"></p>
            <p style="font-size: 11px; margin-top: -2px; font-color: gray; margin-bottom: 0px">{{comment.createdAt | date:'short'}}</p>
          </div>
        </md-card>`
})
export class ProfileCommentsComponent {
@Input('comments') comments: any;
  constructor(private _profileFeedService: ProfileFeedService) {   }

  profileComments: ProfileComment[];
  
}
