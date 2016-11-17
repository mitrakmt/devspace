import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchService } from './search.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private username;
  searchTerm = {'name': ''}

  constructor(private _searchService: SearchService) { }

        onSubmit(form: NgForm) {
            let searchTerm = form.value.searchTerm;
            let username = localStorage.getItem('username');
            form.reset()
            this._searchService.searchUser(username, searchTerm)
              .subscribe(
                data => {
                  return data
          })
        }
  
  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

}
