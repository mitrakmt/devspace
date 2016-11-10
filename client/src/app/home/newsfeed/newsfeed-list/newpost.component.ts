import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NewsfeedListService } from './newsfeed-list.service';


@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
})
export class NewpostComponent {
  myPost: FormGroup;
  constructor(private newsfeedListService: NewsfeedListService) {
    this.myPost = new FormGroup({
      content: new FormControl('', Validators.required)
    })
  }
  onSubmit(event) {
    event.preventDefault()
    console.log("this my post!!", this.myPost);
    
    this.newsfeedListService.sendNewsfeedUpdate(this.myPost)
      .subscribe(
        data => console.log("post data===", data)
      )
  }
}
