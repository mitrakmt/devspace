import { Component, OnInit } from '@angular/core';
import { GithubListService } from './github-list.service'

import { Github } from '../github';
@Component({
  selector: 'app-github-list',
  templateUrl: './github-list.component.html'
})
export class GithubListComponent implements OnInit {
githubposts: Github[] = [];

  constructor(private githubListService: GithubListService) { }

  ngOnInit() {
    this.githubListService.fetchGithubUpdates()
      .subscribe(
        data => {
          data.forEach((item) => {
            if (item.type === 'CreateEvent') {
              item.type = 'Created:'
            } else {
              item.type = 'Forked:'
            }
          })
          this.githubposts = data
          return data
        }
      )
  }

}
