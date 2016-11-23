import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ProfileService } from './profile.service';
import { Router, CanActivate } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { NgSemanticModule } from 'ng-semantic';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public githubData = {};
  public userData = {};
  public languages = [];
  public member;
  public isOwnProfile = true;
  public followStatus;
  public followingList;
  public followerList;

  constructor(private _profileService: ProfileService, private router: Router) { }

  public username;
  public userId;

  currentUser = localStorage.getItem('username');

  follow = () => {
    let followedUsername = this.router.url.slice(5);
    let userId = localStorage.getItem('userid');
    this._profileService.follow(followedUsername, userId)
      .subscribe(
        data => {
          if(data._body ==="Deleted follow"){
            this.followStatus = "Follow";
          }
          if(data._body.includes('Successfully followed')){
            this.followStatus = "Unfollow"
          }
          return data
        }
      )
  }

  

  ngOnInit() {
    let username = this.router.url.slice(5);
    let currentUser = localStorage.getItem('username')
    let userId = localStorage.getItem('userid')

    this._profileService.checkMemberStatus(username)
      .subscribe(
        status => {
          if (status._body == "true") {
            this.member = true
          } else {
            this.member = false
          }
        }
      )

    this._profileService.fetchBytes(username)
      .subscribe(
        data => {
          console.log("LANGUAGES IN PROFILE.COMPONENT-------------------->", data)
          for (var i = 0; i < data.length; i++) {
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

    this._profileService.fetchFollowStatus(username)
      .subscribe(
        followed => {
          if (followed._body == "true") {
            this.followStatus = "Unfollow"
          } else {
            this.followStatus = "Follow"
          }
        }
      )

     this._profileService.fetchFollowing()
      .subscribe(
        data => {
          for(var i = 0; i < data.length; i++) {
            if (data[i].username === username) {
              data.splice(i, 1)
              break;
            }
          }

          this.followingList = data

          for (var i = 0; i < data.length; i++) {
            if(data[i].username === username) {
              this.followStatus = "Unfollow"
            } else {
              this.followStatus = "Follow"
            }
          }
        }
      ) 

      this._profileService.fetchFollowers()
      .subscribe(
        data => {
          for(var i = 0; i < data.length; i++) {
            if (data[i].username === username) {
              data.splice(i, 1)
              break;
            }
          }
          
          this.followerList = data
        }
      )
  }
}