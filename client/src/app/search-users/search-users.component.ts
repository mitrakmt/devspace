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

  constructor(private _searchUsersService: SearchUsersService) { }

    follow = () => {
        let followedUsername = 'mitrakmt'
        let userId = localStorage.getItem('userid');
        this._searchUsersService.follow(followedUsername, userId)
          .subscribe(
            data => {
              return data
            }
          )
      }

  onSubmit(form: NgForm) {
    let searchText = form.value.searchText;

    this._searchUsersService.searchUsers(searchText)
        .subscribe(
          data => {
            console.log(data);
            return data
          }
        )
  }

  ngOnInit() {
  }

}
