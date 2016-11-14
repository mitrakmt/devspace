import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class NewsfeedListService {

  constructor(private _http: Http) { }

    fetchNewsfeedUpdates(): Observable<any> {
      let userid = localStorage.getItem('userid')
      let headers = new Headers({ 'userid': userid })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/home/feed', options)
        .map((res:Response) => res.json())
    }
    sendNewsfeedUpdate(post: any): Observable<any> {
      let userid = localStorage.getItem('userid')
      let content = post._value.content;
      let body = {'content': content};
      let headers = new Headers({'userid': userid});
      headers.append('Content-Type', 'application/json');
      return this._http.post('/api/posts', body, {
        headers: headers
      })
        .map((data) => data.json())
    }
    fetchComments(postId: number): Observable<any> {
      let headers = new Headers({ 'postId': postId })
      let options = new RequestOptions({ headers: headers })
      return this._http.get('/api/home/feed/comments/' + postId, options)
        .map((res:Response) => res.json())
    }

    sendNewComment(comment: any, postId: number): Observable<any> {
      let userid = localStorage.getItem('userid')
      let username = localStorage.getItem('username')
      let content = comment._value.content;
      let body = {'content': content};
      let headers = new Headers({'userid': userid, 'username': username});
      headers.append('Content-Type', 'application/json');
      return this._http.post('/api/posts/comments/' + postId, body, {
        headers: headers
      })
        .map((data) => data.json())
    }
}
