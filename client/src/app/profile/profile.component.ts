import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    // this.profileService.fetchUserInfo()
    //   .subscribe(
    //     data => {
    //       data.forEach((item) => {
    //         console.log(item)
    //       })
    //     }
    //   )

    // this.profileService.fetchGithubUserInfo()
    //   .subscribe(
    //     data => {
    //       data.forEach((item) => {
    //         console.log(item)
    //       })
    //     }
    //   )
  }
}
