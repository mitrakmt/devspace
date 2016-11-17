import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProfileComment } from './profile-comment';
import { ProfilePost } from './profile-post';

import * as io from 'socket\.io-client';
// let socket = io("http://localhost:8000")

@Injectable()

export class ProfileFeedService {
profilePosts: ProfilePost[] = [];

  constructor(private _http: Http) { }

    fetchProfileFeed(): Observable<any> {
      let userid = localStorage.getItem('userid')
      let headers = new Headers({ 'userid': userid })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/home/feed', options)
        .map((res:Response) => {this.profilePosts = res.json();
          return this.profilePosts
      })
        .catch(err=> {return Observable.throw(err.json());
          })
    }
    sendNewPost(post: any): Observable<any> {
      let userid = localStorage.getItem('userid')
      let username = localStorage.getItem('username')
      console.log('username in service', username)
      let body = {'content': post};
      let headers = new Headers({'userid': userid, 'username': username});
      headers.append('Content-Type', 'application/json');
      console.log("body", body, headers)
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
      // socket.emit('chat message', {'username': username, 'content': comment.content, 'userId': userid, 'postId': postId})
      return this._http.post('/api/posts/comments/' + postId, body, {
        headers: headers
      })
        .map((data) => data.json())      
    }
  //   socketServer(callback){
  //     socket.on('chat message server', function(msg) {
  //   console.log('msg: ', msg);
  //   callback(msg)
  // })
  //   }
}
