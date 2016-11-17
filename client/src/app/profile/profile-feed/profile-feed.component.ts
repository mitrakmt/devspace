import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-feed',
  templateUrl: `
        <div>
          <app-profile-list></app-profile-list>
        </div>
  `
})
export class ProfileFeedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
