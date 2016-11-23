import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProjectSidebarService } from '../project-sidebar.service';
import { Project } from '../project';
import 'rxjs/add/operator/map'

@Injectable()
export class ProjectSidebarListService {

  sidebarProjects: Project[] = [];

  constructor(private _http: Http, private projectSidebarService: ProjectSidebarService) { }

  getSidebarProjects(): Observable<any> {
    let username = localStorage.getItem('username')
    let userid = localStorage.getItem('userid')
    let headers = new Headers({ 'userid': userid, username: username })
    let options = new RequestOptions({ headers: headers })
    return this._http.get('/api/home/sidebar', options)
      .map((res:Response) => res.json())
  }
}
