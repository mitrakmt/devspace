import { NgModule }     from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { LandingComponent }  from './landing/landing.component';
import { HomeComponent }    from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'landing', component: LandingComponent },
      { path: 'home', component: HomeComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}