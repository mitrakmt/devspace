import { Component, Input, OnInit } from '@angular/core';
import { NewsfeedComment } from '../newsfeed-comment';
import { NewsfeedListService } from './newsfeed-list.service';


@Component({
  selector: 'app-newsfeed-comments',
  templateUrl: './newsfeed-comments.component.html',
})
export class NewsfeedCommentsComponent implements OnInit {
@Input('postId') postId: number;
@Input() comment: string;
newsfeedComments: NewsfeedComment[] = [];
  constructor(private newsfeedListService: NewsfeedListService) { }
  ngOnInit() {
    this.newsfeedListService.fetchComments(this.postId)
      .subscribe(
        data => {
          console.log('comments data', data)
          this.newsfeedComments = data
          return data
        }
      )
  }
}
