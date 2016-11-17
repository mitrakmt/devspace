import { Component, OnInit, Input } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NewsfeedPost } from '../newsfeed-post';
import { NewsfeedComment } from '../newsfeed-comment'
import { NewsfeedListService } from './newsfeed-list.service';


@Component({
  selector: 'app-newsfeed-post',
  styleUrls: ['./newsfeed-post.component.css'],
  template: `
    <md-card class="card" md-padding md-margin>
      <p class="time">{{newsfeedPost.createdAt | date:'short'}}</p>
      <br>
      <div style="margin-top: -3px;">
          <p><a [routerLink]="['/profile', newsfeedPost.user.username]" style="font-size: 16px;"><strong>{{newsfeedPost.user.username}}</strong></a>: {{newsfeedPost.content}}</p>
          <p>
            <span class="like-button" (click)="likePost()"> +</span> 
            Likes: {{newsfeedPost.likes}} 
          </p>
          <app-newcomment [postId]="postId"></app-newcomment>
      </div>
      <div *ngIf="newsfeedPost.comments.length > 0">
          <app-newsfeed-comments [comments]="newsfeedPost.comments"> </app-newsfeed-comments>
      </div>
  </md-card>
  `
})
export class NewsfeedPostComponent implements OnInit {
  @Input() newsfeedPost: any;
  @Input('postId') postId: number;
  constructor(private newsfeedListService: NewsfeedListService) { }
  newsfeedComments: NewsfeedComment[] = [];

  likePost = () => {
    let postId = this.postId
    let userId = localStorage.getItem('userid');
    this.newsfeedListService.likePost(postId, userId)
      .subscribe(
        response => {
          console.log(response)  
        }
      )
  }

  ngOnInit() {
    this.postId = this.newsfeedPost.id;
    // console.log("id-->", this.postId);
    // console.log("posts feed", this.newsfeedPost)
  }

}
