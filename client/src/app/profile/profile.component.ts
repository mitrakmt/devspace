import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ProfileService } from './profile.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService, private router: Router) { }

  follow = () => {
    let followedUsername = this.router.url.slice(9);
    let userId = localStorage.getItem('userid');
    this.profileService.follow(followedUsername, userId)
      .subscribe(
        data => {
          console.log('data', data)
          return data
        }
      )
  }

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
