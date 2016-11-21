import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CollapseDirective } from 'ng2-bootstrap'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public username = localStorage.getItem('username')
  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  public avatar = localStorage.getItem('userAvatar')

  public collapsed(event:any):void {
    console.log(event);
  }
 
  public expanded(event:any):void {
    console.log(event);
  }

  constructor() { }

  ngOnInit() {

  }

}
