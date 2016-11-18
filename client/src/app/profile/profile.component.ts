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
  public languages = [];

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
          for (var i = 1; i < data.length; i++) {
            if(data[i].language[0] === 'JavaScript'){
            this.languages.push("https://wp-andypiapps.rhcloud.com/wp-content/uploads/2016/08/js4560_450.png")
            }
            if(data[i].language[0] === 'HTML'){
            this.languages.push("https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/200px-HTML5_logo_and_wordmark.svg.png")
            }
            if(data[i].language[0] === 'TypeScript'){
            this.languages.push("https://chocolatey.org/content/packageimages/typescript.vs.1.0.1.png")
            }
            
          }

          this._profileService.bytesStat = data[0].language[1]
        }
      )

    this._profileService.fetchGithubUserInfo(username, currentUser)
      .subscribe(
        data => {
          this._profileService.githubData = data;
          this.githubData = data;
        }
      )

    this._profileService.fetchUserInfo(username)
      .subscribe(
        data => {
          this._profileService.userData = data;
          this.userData = data;
        }
      )
  }
}