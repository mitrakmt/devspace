import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  constructor() {
    this.profileForm = new FormGroup({
      'email': new FormControl(),
      'bio': new FormControl()
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.profileForm);
  }
}
