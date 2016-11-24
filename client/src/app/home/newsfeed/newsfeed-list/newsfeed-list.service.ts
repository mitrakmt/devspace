import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NewsfeedComment } from '../newsfeed-comment';
import { NewsfeedPost } from '../newsfeed-post';

import * as io from 'socket.io-client';

@Injectable()

export class NewsfeedListService {
socket = io("http://localhost:8000")
newsfeedPosts: NewsfeedPost[] = [];
secondaryList: NewsfeedPost[] = [];

  constructor(private _http: Http) { }

  insertionSort = (unsortedList) => { 
    for (var i = 0; i < unsortedList.length; i++) {
        var tmp = unsortedList[i]
        for (var j = i - 1; j >= 0 && (unsortedList[j].id < tmp.id); j--) {
            unsortedList[j + 1] = unsortedList[j]
        }
        unsortedList[j + 1] = tmp;
    }
    return unsortedList
  }

    fetchNewsfeedUpdates(): Observable<any> {
      let userid = localStorage.getItem('userid')
      let headers = new Headers({ 'userid': userid })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/home/feed', options)
        .map((res:Response) => {
          let orderedPosts = this.insertionSort(res.json())
          this.newsfeedPosts = orderedPosts
          return this.newsfeedPosts
      })
        .catch(err=> {
          return Observable.throw(err.json()) 
        })
    }
    sendNewsfeedUpdate(post: any): Observable<any> {
      let userid = localStorage.getItem('userid')
      let username = localStorage.getItem('username')
      let avatar = localStorage.getItem('imageUrl')
      let firstname = localStorage.getItem('firstname')
      let lastname = localStorage.getItem('lastname')
      let body = {'content': post };
      let headers = new Headers({'userid': userid, 'username': username});
      headers.append('Content-Type', 'application/json');
      this.socket.emit('subscribe', userid)
      this.socket.emit('post', {room: userid, post: {'createdAt': new Date(), 'user': {'username': username, 'imageUrl': avatar, 'firstName': firstname, 'lastName': lastname}, 'content': post, 'userId': userid, 'comments': [], 'likes': 0}})
      return this._http.post('/api/posts', body, {
        headers: headers
      })
        .map((data) => data.json())
    }

    sendNewComment(comment: any, postId: number): Observable<any> {
      let userid = localStorage.getItem('userid')
      let username = localStorage.getItem('username')
      let avatar = localStorage.getItem('imageUrl')
      let firstname = localStorage.getItem('firstname')
      let lastname = localStorage.getItem('lastname')
      let body = {'content': comment};
      let headers = new Headers({'userid': userid, 'username': username, 'firstName': firstname, 'lastName': lastname});
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

    socketRecieve(callback){
      this.socket.on('post server', (post) => {
        callback(post)
      })
    }

}
