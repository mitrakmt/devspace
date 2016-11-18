import { Component, OnInit, Input } from '@angular/core';

import { ProfilePost } from './profile-post';
import { ProfileComment } from './profile-comment'
import { ProfileFeedService } from './profile-feed.service';


@Component({
  selector: 'app-profile-post',
  styleUrls: ['/profile-post.component.css'],
  template: `
    <md-card class="card" md-padding md-margin>
      <p class="time">{{profilePost.createdAt | date:'short'}}</p>
      <br>
      <div style="margin-top: -3px;">
          <p><a [routerLink]="['/profile', profilePost.user.username]" style="font-size: 16px;"><strong>{{profilePost.user.username}}</strong></a>: {{profilePost.content}}</p>
          <p>
            Likes: {{profilePost.likes}} 
          </p>
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
