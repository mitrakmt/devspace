import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewsfeedComponent } from './home/newsfeed/newsfeed.component';
import { ProjectSidebarComponent } from './home/project-sidebar/project-sidebar.component';
import { GithubComponent } from './home/github/github.component';
import { SearchComponent } from './home/search/search.component';
import { NewsfeedItemComponent } from './home/newsfeed/newsfeed-list/newsfeed-item.component';
import { NewsfeedListComponent } from './home/newsfeed/newsfeed-list/newsfeed-list.component';
import { GithubListComponent } from './home/github/github-list/github-list.component';
import { GithubItemComponent } from './home/github/github-list/github-item.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './landing/navbar/navbar.component';
import { MainComponent } from './landing/main/main.component';
import { HomeService } from './home/home.service';
import { GithubListService } from './home/github/github-list/github-list.service';
import { ProjectSidebarListService } from './home/project-sidebar/project-sidebar-list/project-sidebar-list.service';
import { ProjectSidebarListComponent } from './home/project-sidebar/project-sidebar-list/project-sidebar-list.component';
import { ProjectSidebarItemComponent } from './home/project-sidebar/project-sidebar-list/project-sidebar-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsfeedComponent,
    ProjectSidebarComponent,
    GithubComponent,
    SearchComponent,
    NewsfeedItemComponent,
    NewsfeedListComponent,
    GithubListComponent,
    GithubItemComponent,
    LandingComponent,
    NavbarComponent,
    MainComponent,
    ProjectSidebarListComponent,
    ProjectSidebarItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      { path: 'landing', component: LandingComponent },
      { path: 'home', component: HomeComponent },
      { path: 'app', component: AppComponent }
    ])
  ],
  providers: [
    HomeService,
    GithubListService,
    ProjectSidebarListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
