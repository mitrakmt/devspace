import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewsfeedComponent } from './home/newsfeed/newsfeed.component';
import { ProjectSidebarComponent } from './home/project-sidebar/project-sidebar.component';
import { GithubComponent } from './home/github/github.component';
import { SearchComponent } from './home/search/search.component';
import { NewsfeedPostComponent } from './home/newsfeed/newsfeed-list/newsfeed-post.component';
import { NewsfeedListComponent } from './home/newsfeed/newsfeed-list/newsfeed-list.component';
import { GithubListComponent } from './home/github/github-list/github-list.component';
import { GithubItemComponent } from './home/github/github-list/github-item.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './landing/navbar/navbar.component';
import { MainComponent } from './landing/main/main.component';
import { HomeService } from './home/home.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { GithubListService } from './home/github/github-list/github-list.service';
import { ProjectSidebarListService } from './home/project-sidebar/project-sidebar-list/project-sidebar-list.service';
import { ProjectSidebarListComponent } from './home/project-sidebar/project-sidebar-list/project-sidebar-list.component';
import { ProjectSidebarItemComponent } from './home/project-sidebar/project-sidebar-list/project-sidebar-item.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { NewsfeedListService } from './home/newsfeed/newsfeed-list/newsfeed-list.service';
import { NewpostComponent } from './home/newsfeed/newsfeed-list/newpost.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewcommentComponent } from './home/newsfeed/newsfeed-list/newcomment.component';
<<<<<<< HEAD
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectDashboardService } from './project-dashboard/project-dashboard.service';
import { ProjectCommitsComponent } from './project-commits/project-commits.component';
=======
import { NewsfeedCommentsComponent } from './home/newsfeed/newsfeed-list/newsfeed-comments.component';

>>>>>>> feat/client-newsfeed

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsfeedComponent,
    ProjectSidebarComponent,
    GithubComponent,
    SearchComponent,
    NewsfeedPostComponent,
    NewsfeedListComponent,
    GithubListComponent,
    GithubItemComponent,
    LandingComponent,
    NavbarComponent,
    MainComponent,
    ProjectSidebarListComponent,
    ProjectSidebarItemComponent,
    LoginComponent,
    NewpostComponent,
    NewcommentComponent,
<<<<<<< HEAD
    ProjectDashboardComponent,
    ProjectCommitsComponent
=======
    NewsfeedCommentsComponent
>>>>>>> feat/client-newsfeed
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      { path: 'landing', component: LandingComponent },
      { path: 'home', component: HomeComponent },
      { path: 'app', component: AppComponent },
      { path: 'login', component: LoginComponent },
      { path: 'auth/github/callback', redirectTo: '/home'},
      { path: 'auth/github', children: []},
      { path: 'projects/:projectId', component: ProjectDashboardComponent }
    ])
  ],
  providers: [
    HomeService,
    GithubListService,
    ProjectSidebarListService,
    LoginService,
    NewsfeedListService,
    AUTH_PROVIDERS,
    ProjectDashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
