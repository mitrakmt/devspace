import { Component, OnInit } from '@angular/core';
import { GithubListService } from './github-list.service'

import { Github } from '../github';
@Component({
  selector: 'app-github-list',
  templateUrl: './github-list.component.html'
})
export class GithubListComponent implements OnInit {
githubposts: Github[] = [];

  constructor(private githubListService: GithubListService) { }

  ngOnInit() {
    this.githubListService.fetchGithubUpdates()
      .subscribe(
        data => {
          data.forEach((item) => {
            // refactor this to an object for searching
            if (item.type === 'CreateEvent') {
              item.type = 'Created:'
            } else if (item.type === 'ForkEvent') {
              item.type = 'Forked:'
            } else if (item.type === 'WatchEvent') {
              item.type = 'Watched:'
            } else if (item.type === 'IssuesEvent') {
              item.type = 'Issue:'
            } else if (item.type === 'IssueCommentEvent') {
              item.type = 'Commented on:'
            } else if (item.type === 'CommitCommentEvent') {
              item.type = 'Commented on:'
            } else if (item.type === 'DeleteEvent') {
              item.type = 'Deleted:'
            } else if (item.type === 'DeploymentEvent') {
              item.type = 'Deployed:'
            } else if (item.type === 'DeploymentStatusEvent') {
              item.type = 'Deployed Status:'
            } else if (item.type === 'DownloadEvent') {
              item.type = 'Downloaded:'
            } else if (item.type === 'FollowEvent') {
              item.type = 'Followed:'
            } else if (item.type === 'ForkApplyEvent') {
              item.type = 'Forked:'
            } else if (item.type === 'GistEvent') {
              item.type = 'Created gist:'
            } else if (item.type === 'GollumEvent') {
              item.type = 'Created Gollum:'
            } else if (item.type === 'LabelEvent') {
              item.type = 'Labeled:'
            } else if (item.type === 'MemberEvent') {
              item.type = 'Joined:'
            } else if (item.type === 'MembershipEvent') {
              item.type = 'Joined:'
            } else if (item.type === 'pageBuildEvent') {
              item.type = 'Build:'
            } else if (item.type === 'MilestoneEvent') {
              item.type = 'Milestone:'
            } else if (item.type === 'PublicEvent') {
              item.type = 'Now Public:'
            } else if (item.type === 'PullRequestReviewEvent') {
              item.type = 'Reviewed:'
            } else if (item.type === 'PullRequestReviewCommentEvent') {
              item.type = 'Commented on:'
            } else if (item.type === 'PushEvent') {
              item.type = 'Pushed:'
            } else if (item.type === 'ReleaseEvent') {
              item.type = 'Released:'
            } else if (item.type === 'RepositoryEvent') {
              item.type = 'Modified Repository:'
            } else if (item.type === 'StatusEvent') {
              item.type = 'Status:'
            } else if (item.type === 'StatusEvent') {
              item.type = 'Status:'
            } else if (item.type === 'TeamAddEvent') {
              item.type = 'Added Team:'
            } else if (item.type === 'PullRequestEvent') {
              item.type = 'pull request:'
            }
          })
          this.githubposts = data
          return data
        }
      )
  }

}
