import { Component, OnInit } from '@angular/core';

import { ProfileFeedService } from './profile-feed.service';
import {ProfilePost } from './profile-post';

@Component({
  selector: 'app-profile-list',
  template: `
        <h1 style="text-align: center;">My Feed</h1>
        <hr>
        <app-profile-newpost></app-profile-newpost>
        <ul>
          <app-profile-post *ngFor="let profilePost of _profileFeedService.profilePosts" [profilePost]="profilePost"></app-profile-post>
        </ul>`
})
export class ProfileListComponent implements OnInit {
  profilePosts: ProfilePost[] = [];
  private profileComments
  constructor(private _profileFeedService: ProfileFeedService) { }

  ngOnInit() {
    this._profileFeedService.fetchProfileFeed()
      .subscribe(
        data => {
          this.profilePosts = data
          this._profileFeedService.profilePosts = data
          return data
        }
      )
  }
}
