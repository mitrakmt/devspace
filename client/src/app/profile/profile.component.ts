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
  public isOwnProfile = true;
  public stockImage = 'https://pbs.twimg.com/profile_images/603994727260749824/zpLtrulD.png';
  public isOwnProfile = false;
  public isNotFollowing: boolean;
  public followStatus;

  constructor(private _profileService: ProfileService, private router: Router) { }

  username = this.router.url.slice(5);
  currentUser = localStorage.getItem('username');

  follow = () => {
    console.log("follow triggered")
    let followedUsername = this.router.url.slice(5);
    let userId = localStorage.getItem('userid');
    this._profileService.follow(followedUsername, userId)
      .subscribe(
        data => {
          return data
        }
      )
  }
  toggle = () => {
    if(this.isNotFollowing === false){
      this._profileService.followStatus = "Unfollow";
      this.followStatus = "Unfollow";
    }
    if(this.isNotFollowing === true){
      this._profileService.followStatus = "Follow";
      this.followStatus = "Follow";
    }
  }

  ngOnInit() {
    let username = this.router.url.slice(5);
    let currentUser = localStorage.getItem('username');
    // let userid = localStorage.getItem('userid')

    this._profileService.fetchBytes(username)
      .subscribe(
        data => {
          for (var i = 1; i < data.length; i++) {
            if (data[i].language[0] === 'JavaScript') {
              this.languages.push("https://wp-andypiapps.rhcloud.com/wp-content/uploads/2016/08/js4560_450.png")
            } else if (data[i].language[0] === 'HTML') {
              this.languages.push("https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/200px-HTML5_logo_and_wordmark.svg.png")
            } else if (data[i].language[0] === 'TypeScript') {
              this.languages.push("https://chocolatey.org/content/packageimages/typescript.vs.1.0.1.png")
            } else if (data[i].language[0] === 'CSS') {
              this.languages.push("http://2016.cssday.it/img/confs/css/css3.png")
            } else if (data[i].language[0] === 'Java') {
              this.languages.push("https://ignite.apache.org/images/java.png")
            } else if (data[i].language[0] === 'Ruby') {
              this.languages.push("http://nicholasjohnson.com/images/sections/ruby.png")
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

     this._profileService.fetchFollowing()

      .subscribe(
        data => {
          for (var i = 0; i < data.length; i++) {
              if(data[i].username === username){
                console.log("username to user", data[i].username, username)
                this._profileService.isNotFollowing = false;
                this.isNotFollowing = false;
                this._profileService.followStatus = "Unfollow";
                this.followStatus = "Unfollow"
                console.log("are you already following?", this.isNotFollowing)
            }
            else {
              this._profileService.isNotFollowing = true;
              this.isNotFollowing = true;
              this._profileService.followStatus = "Follow";
              this.followStatus = "Follow"
              
            }
          }
        }
      ) 
  }
}