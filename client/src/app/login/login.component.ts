import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { MaterialModule } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

    login() {
      this.loginService.login()
        .subscribe(
        (user) => {
          console.log(user)
        }
      )
    }

  ngOnInit() {
    
  }

}
