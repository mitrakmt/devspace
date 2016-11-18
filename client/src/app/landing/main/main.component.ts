import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { MainService } from './main.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private mainService: MainService) {  }

  login() {
    this.mainService.login()
      .subscribe(
        data => {
          return data
        }
      )
  }

  ngOnInit() {
  }

}
