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
      <div style="margin-top: -13px;">

         <md-list>
          <md-list-item>
            <img md-list-avatar src="{{ newsfeedPost.user.imageUrl }}">
            <h5 md-line style="margin-bottom: 0; margin-left: 5px; padding-bottom: 0;"><strong>{{ newsfeedPost.user.firstName }} {{ newsfeedPost.user.lastName }}</strong></h5>
            <p class="time">{{newsfeedPost.createdAt | date:'short'}}</p>

            <p md-line class="username"><a [routerLink]="['/dev', newsfeedPost.user.username]" class="username"> @{{ newsfeedPost.user.username }}</a></p>
          </md-list-item>
        </md-list>

         <md-list>
          <div>
            <div md-line style="font-size: 17px" [innerHTML]="newsfeedPost.content | emojify" style="border: 1px solid lightgray; padding: 7px;"></div>
            <p md-line style="margin-top: 15px; padding: 5px;"><span class="like-button" [ngClass]="{ 'likedStyle': newsfeedPost.liked }" (click)="likePost()"> +</span> Likes: {{newsfeedPost.likes}}</p>
          </div>
        </md-list>

        <br>

        <app-newsfeed-newcomment [postId]="postId"></app-newsfeed-newcomment>
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
    this.newsfeedPost.liked = !this.newsfeedPost.liked
    this.newsfeedListService.likePost(postId, userId)
      .subscribe(
        response => { 
          this.newsfeedListService.newsfeedPosts.map(post => {
            if(post['id'] === this.postId) {
              if (response.status === 201) {
                post['likes']++
              } else {
                post['likes']--
              }
            }
            return post
          }) 
        }
      )
  }

  ngOnInit() {
    this.postId = this.newsfeedPost.id;
  }

}
