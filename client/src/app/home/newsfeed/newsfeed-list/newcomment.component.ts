import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NewsfeedListService } from './newsfeed-list.service';

@Component({
  selector: 'app-newcomment',
  templateUrl: './newcomment.component.html'
})
export class NewcommentComponent{
  @Input("postId") postId: number;
myComment: FormGroup;
  constructor(private newsfeedListService: NewsfeedListService) {
    this.myComment = new FormGroup({
      content: new FormControl('', Validators.required)
    })
  }
  onSubmit(event) {
    event.preventDefault()
    this.newsfeedListService.sendNewComment(this.myComment, this.postId)
      .subscribe(
        data => console.log("comment data===", data)
      )
  }
}
