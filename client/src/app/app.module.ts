import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AUTH_PROVIDERS } from 'angular2-jwt';

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
import { NewcommentComponent } from './home/newsfeed/newsfeed-list/newcomment.component';
import { NewsfeedCommentsComponent } from './home/newsfeed/newsfeed-list/newsfeed-comments.component';
import { ProjectSidebarService } from './home/project-sidebar/project-sidebar.service';
import { HomeService } from './home/home.service';
import { GithubListService } from './home/github/github-list/github-list.service';
import { ProjectSidebarListService } from './home/project-sidebar/project-sidebar-list/project-sidebar-list.service';
import { ProjectSidebarListComponent } from './home/project-sidebar/project-sidebar-list/project-sidebar-list.component';
import { ProjectSidebarItemComponent } from './home/project-sidebar/project-sidebar-list/project-sidebar-item.component';
import { NewsfeedListService } from './home/newsfeed/newsfeed-list/newsfeed-list.service';
import { NewpostComponent } from './home/newsfeed/newsfeed-list/newpost.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './landing/navbar/navbar.component';
import { MainComponent } from './landing/main/main.component';
import { MainService } from './landing/main/main.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectDashboardService } from './project-dashboard/project-dashboard.service';
import { ProjectCommitsComponent } from './project-dashboard/project-commits/project-commits.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFeedComponent } from './profile/profile-feed/profile-feed.component';
import { ProfileService } from './profile/profile.service'
import { ProfileFeedService } from './profile/profile-feed/profile-feed.service';
import { ProfileListComponent } from './profile/profile-feed/profile-list.component';
import { ProfileNewPostComponent } from './profile/profile-feed/newpost.component';
import { ProfileNewCommentComponent } from './profile/profile-feed/newcomment.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfilePostComponent } from './profile/profile-feed/profile-post.component';
import { ProfileCommentsComponent } from './profile/profile-feed/profile-comments.component';
import { SearchService } from './home/search/search.service';
import { TeamDashboardComponent } from './teams/team-dashboard/team-dashboard.component';
import { TeamService } from './teams/team.service';
import { TeamProjectComponent } from './teams/team-project/team-project.component';
import { TeamsComponent } from './teams/teams.component';

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
    ProjectDashboardComponent,
    ProjectCommitsComponent,
    NewsfeedCommentsComponent,
    ProfileComponent,
    ProfileFeedComponent,
    ProfileListComponent,
    ProfileNewPostComponent,
    ProfileNewCommentComponent,
    ProfilePostComponent,
    ProfileCommentsComponent,
    TeamDashboardComponent,
    TeamProjectComponent,
    TeamsComponent,
    ProfileEditComponent
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
      { path: 'dev/:userId', component: ProfileComponent },
      { path: 'signup', component: LoginComponent },
      { path: 'auth/github/callback', redirectTo: '/home'},
      { path: 'auth/github', children: []},
      { path: 'projects/:projectId', component: ProjectDashboardComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'teams/:teamId', component: TeamDashboardComponent },
      { path: 'teams/:teamId/:teamProjectId', component: TeamProjectComponent}
    ])
  ],
  providers: [
    HomeService,
    GithubListService,
    ProjectSidebarListService,
    LoginService,
    ProfileService,
    NewsfeedListService,
    AUTH_PROVIDERS,
    ProjectDashboardService,
    ProjectSidebarService,
    ProfileFeedService,
    MainService,
    SearchService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
