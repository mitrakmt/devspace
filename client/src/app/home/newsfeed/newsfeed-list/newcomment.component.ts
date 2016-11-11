import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NewsfeedListService } from './newsfeed-list.service';

@Component({
  selector: 'app-newcomment',
  templateUrl: './newcomment.component.html'
})
export class NewcommentComponent{
myComment: FormGroup;
  constructor(private newsfeedListService: NewsfeedListService) {
    this.myComment = new FormGroup({
      content: new FormControl('', Validators.required)
    })
  }
  onSubmit(event) {
    event.preventDefault()
    console.log("this my comment!!", event);
    
    this.newsfeedListService.sendNewComment(this.myComment)
      .subscribe(
        data => console.log("comment data===", data)
      )
  }
}
