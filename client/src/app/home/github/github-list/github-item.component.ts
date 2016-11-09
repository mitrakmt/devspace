import { Component, OnInit, Input } from '@angular/core';

import { Github } from '../github';
@Component({
  selector: 'app-github-item',
  templateUrl: './github-item.component.html'
})
export class GithubItemComponent implements OnInit {
  @Input() githubpost: Github;
  githubId: number;
  constructor() { }

  ngOnInit() {
  }

}
