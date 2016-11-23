import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';
import { ProfileComment } from './profile-comment';
import { ProfilePost } from './profile-post';

// import * as io from 'socket\.io-client';
// let socket = io("http://localhost:8000")

@Injectable()

export class ProfileFeedService {

profilePosts: ProfilePost[] = [];

  constructor(private _http: Http, private router: Router ) { }

    fetchProfileFeed(): Observable<any> {
      let userid = localStorage.getItem('userid')
      let username = this.router.url.slice(5);
      let headers = new Headers({ 'userid': userid, 'username': username })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/users/profile/feed', options)
        .map((res:Response) => {
          if (res) {
            this.profilePosts = res.json();
            return this.profilePosts
          } else {
            return
          }
        })
        .catch(err=> {
          return Observable.throw(err.json());
        })
    }
    
    sendNewPost(post: any): Observable<any> {
      let userid = localStorage.getItem('userid')
      let username = localStorage.getItem('username')
      let body = {'content': post};
      let headers = new Headers({'userid': userid, 'username': username});
      headers.append('Content-Type', 'application/json');
      return this._http.post('/api/posts', body, {
        headers: headers
      })
        .map((data) => data.json())
    }

    sendNewComment(comment: any, postId: number): Observable<any> {
      let userid = localStorage.getItem('userid')
      let username = localStorage.getItem('username')
      let body = {'content': comment};
      let headers = new Headers({'userid': userid, 'username': username});
      headers.append('Content-Type', 'application/json');
      return this._http.post('/api/posts/comments/' + postId, body, {
        headers: headers
      })
        .map((data) => data.json())      
    }
    
    likePost(postId, userid): Observable<any> {
      let headers = new Headers({'userid': userid});
      headers.append('Content-Type', 'application/json');
      return this._http.put('/api/posts/interactions/' + postId, {}, {
        headers: headers
      })
    }
}
