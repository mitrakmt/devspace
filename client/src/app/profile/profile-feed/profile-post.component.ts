import { Component, OnInit, Input } from '@angular/core';

import { ProfilePost } from './profile-post';
import { ProfileComment } from './profile-comment'
import { ProfileFeedService } from './profile-feed.service';


@Component({
  selector: 'app-profile-post',
  styleUrls: ['/profile-post.component.css'],
  template: `
    <md-card class="card" md-padding md-margin>
      <div style="margin-top: -13px;">

         <md-list>
          <md-list-item>
            <img md-list-avatar src="{{ profilePost.user.imageUrl }}">
            <h5 md-line style="margin-bottom: 0; margin-left: 5px; padding-bottom: 0;"><strong>{{ profilePost.user.firstName }} {{ profilePost.user.lastName }}</strong></h5>
            <p class="time">{{profilePost.createdAt | date:'short'}}</p>

            <p md-line><a [routerLink]="['/dev', profilePost.user.username]" style="font-size: 12px; margin: 0; padding: 2px; margin-left: 10px;"> {{ profilePost.user.username }}</a></p>
          </md-list-item>
        </md-list>       

         <md-list>
          <md-list-item>
            <p md-line style="font-size: 17px"> <span> {{profilePost.content}} </span></p>
            <p md-line style="margin-top: 15px;"><span> Likes: {{profilePost.likes}} </span></p>
          </md-list-item>
        </md-list>               

        <app-profile-newcomment [postId]="postId"></app-profile-newcomment>
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

likePost = () => {
    let postId = this.postId
    let userId = localStorage.getItem('userid');
    this.profileService.likePost(postId, userId)
      .subscribe(
        response => {
          this.profileService.profilePosts.map((post) => {
          if(post.id === this.postId){
            if (response.status === 201) {
              post.likes++
            } else {
              post.likes--
            }
          }
          return post
          }) 
        }
      )
  }

  ngOnInit() {
    this.postId = this.profilePost.id;
  }

}
