import { Component, OnInit, Input } from '@angular/core';

import { ProfilePost } from './profile-post';
import { ProfileComment } from './profile-comment'
import { ProfileFeedService } from './profile-feed.service';


@Component({
  selector: 'app-profile-post',
  template: `
    <md-card style="margin-bottom: 20px" md-padding md-margin>
      <div>
          <h4><a href="{{profilePost.user.username}}">{{profilePost.user.username}}</a>: {{profilePost.content}}</h4>
          <p>{{profilePost.createdAt | date:'medium'}}</p>
          <p>likes: {{profilePost.likes}}</p>
          <app-newcomment [postId]="postId"></app-newcomment>
      </div>
      <div *ngIf="profilePost.comments.length > 0">
          <app-profile-comments [comments]="profilePost.comments"> </app-profile-comments>
      </div>
  </md-card>
  `
})
export class ProfilePostComponent implements OnInit {
  @Input() profilePost: any;
  @Input('postId') postId: number;
  constructor(private profileService: ProfileFeedService) { }
  profileComments: ProfileComment[] = [];

  ngOnInit() {
    this.postId = this.profilePost.id;
    // console.log("id-->", this.postId);
    // console.log("posts feed", this.newsfeedPost)
  }

}
