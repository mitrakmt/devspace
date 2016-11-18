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

  public githubData = {};
  public userData = {};
  public languages = ['Languages: '];

  constructor(private _profileService: ProfileService, private router: Router) { }

  follow = () => {
    let followedUsername = this.router.url.slice(5);
    let userId = localStorage.getItem('userid');
    this._profileService.follow(followedUsername, userId)
      .subscribe(
        data => {
          return data
        }
      )
  }

  ngOnInit() {
    let username = this.router.url.slice(5);
    let currentUser = localStorage.getItem('username');

    this._profileService.fetchBytes(username)
      .subscribe(
        data => {
          console.log(data)
          for (var i = 1; i < data.length; i++) {
            this.languages.push(data[i].language[0])
          }

          this._profileService.bytesStat = data[0].language[1]
        }
      )

    this._profileService.fetchGithubUserInfo(username, currentUser)
      .subscribe(
        data => {
          this._profileService.githubData = data;
          this.githubData = data;
          console.log('This', this._profileService.githubData)

        }
      )

    this._profileService.fetchUserInfo(username)
      .subscribe(
        data => {
          this._profileService.userData = data;
          this.userData = data;
          console.log("USER DATAAAAAA", this._profileService.userData)
        }
      )
  }
}