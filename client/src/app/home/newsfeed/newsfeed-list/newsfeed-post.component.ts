import { Component, OnInit, Input } from '@angular/core';

import { NewsfeedPost } from '../newsfeed-post';
import { NewsfeedComment } from '../newsfeed-comment'
import { NewsfeedListService } from './newsfeed-list.service';


@Component({
  selector: 'app-newsfeed-post',
  template: `
    <md-card style="margin-bottom: 20px" md-padding md-margin>
      <div>
          <h4><a href="{{newsfeedPost.user.username}}">{{newsfeedPost.user.username}}</a>: {{newsfeedPost.content}}</h4>
          <p>{{newsfeedPost.createdAt | date:'medium'}}</p>
          <p><span class="like-button" (click)="likePost()" style="color: white; background-color: #377BB5;border: 1px solid #377BB5; padding: 3px;">+1</span> | likes: {{newsfeedPost.likes}}</p>
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
