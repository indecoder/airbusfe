import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private _data:  DataService) {
    
  }

  ngOnInit() {
    if(this.token) {
      this.data.getProfile();
    }
  }

  get token() {
    return localStorage.getItem('token');
  }

  get data() {
    return this._data;
  }

  logout() {
    this.data.user = {};
    localStorage.clear();
    this.router.navigate(['']);
  }
}
