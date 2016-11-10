import { Component, OnInit } from '@angular/core';
import { GithubListService } from './github-list.service'

import { Github } from '../github';
@Component({
  selector: 'app-github-list',
  templateUrl: './github-list.component.html'
})
export class GithubListComponent implements OnInit {
githubposts: Github[] = [
//   new Github("https://avatars.githubusercontent.com/u/17018339?", "samsjchi", "WatchEvent", "kensterz/interview-questions-in-javascript"),
//   new Github("https://avatars.githubusercontent.com/u/16600542?", "justsandytran", "ForkEvent", "johnpapa/angular-styleguide"),
//   new Github("https://avatars.githubusercontent.com/u/150330?", "getify", "WatchEvent", "jsbin/loop-protect"),
//   new Github("https://avatars3.githubusercontent.com/u/1202528?", "johnpapa", "WatchEvent", "johnpapa/angular-styleguide"),
//   new Github("https://avatars.githubusercontent.com/u/14076879?", "oliv3rwang", "ForkEvent", "djoj/Notejs"),
//   new Github("https://avatars.githubusercontent.com/u/12263817?", "ckuh", "CreateEvent", "ckuh/typeracer"),
//   new Github("https://avatars.githubusercontent.com/u/14260862?", "tiffanyip", "WatchEvent", "callemall/material-ui")
];

  constructor(private githubListService: GithubListService) { }

  ngOnInit() {
    this.githubListService.fetchGithubUpdates()
      .subscribe(
        data => {
          console.log('data', data)
          this.githubposts = data
          return data
        }
      )
  }

}
