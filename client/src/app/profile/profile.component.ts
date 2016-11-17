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

  constructor(private _profileService: ProfileService, private router: Router) { }

  follow = () => {
    let followedUsername = this.router.url.slice(9);
    let userId = localStorage.getItem('userid');
    this._profileService.follow(followedUsername, userId)
      .subscribe(
        data => {
          return data
        }
      )
  }

  ngOnInit() {
    let username = this.router.url.slice(9);
    let currentUser = localStorage.getItem('username');

    this._profileService.fetchUserInfo(username)
      .subscribe(
        data => {
          this._profileService.userData = data;
          console.log(this._profileService.userData)
          return data
        }
      )

    this._profileService.fetchGithubUserInfo(username, currentUser)
      .subscribe(
        data => {
          this._profileService.githubData = data;
          console.log('This', this._profileService.githubData)
          return data
        }
      )
  }
}
