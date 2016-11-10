import { Component, OnInit } from '@angular/core';
import { NewsfeedListService } from './newsfeed-list.service'

import { Newspost } from '../newspost';
// import {} from './newsfeed-item.component'
@Component({
  selector: 'app-newsfeed-list',
  templateUrl: './newsfeed-list.component.html'
})
export class NewsfeedListComponent implements OnInit {
  newsfeedposts: Newspost[] = [];

  constructor(private newsfeedListService: NewsfeedListService) { }

  ngOnInit() {
    this.newsfeedListService.fetchNewsfeedUpdates()
      .subscribe(
        data => {
          console.log('newsfeed data', data)
          this.newsfeedposts = data
          return data
        }
      )
  }

}
