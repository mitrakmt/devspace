import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-newsfeed-comments',
  templateUrl: './newsfeed-comments.component.html',
})
export class NewsfeedCommentsComponent{
@Input('postId') postId: number;
@Input() comment: string;
  constructor() { }
}
