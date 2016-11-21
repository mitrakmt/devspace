import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public username = localStorage.getItem('username')
  public avatar = localStorage.getItem('userAvatar')

  public username
  public avatar

  constructor(public router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('username')
    this.avatar = localStorage.getItem('imageUrl')
  }

}
