import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SearchUsersService } from './search-users.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  public searchedUsers = [];
  public followStatus;

  constructor(private _searchUsersService: SearchUsersService, public router: Router) { }

  follow = (followedUsername) => {
    let userId = localStorage.getItem('userid');
    this._searchUsersService.follow(followedUsername, userId)
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

  searchUsers = (searchTerm) => {
    this._searchUsersService.searchUsers(searchTerm)
        .subscribe(
          data => {
            this.searchedUsers = data.items;
            this._searchUsersService.searchedUsers = data.items;
          }
        )
  }

  ngOnInit() {
  }

}
