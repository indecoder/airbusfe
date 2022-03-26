import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  message = '';
  user:any;
  messageType = 'danger';

  constructor(private router:Router, private rest: RestApiService) { 
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  error(message: string) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message: string) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(message: string) {
    this.messageType = 'warning';
    this.message = message;
  }

  async getProfile() {
    try {
      if (localStorage.getItem('token')) {
        const data:any = await this.rest.get(
          'https://3030-manishdev-airbusbe-a2ckahr6wl7.ws-us38.gitpod.io/api/accounts/profile'
        );
        this.user = data['user'];
      }
    } catch (error: any) {
      this.error(error);
    }
  }

  getAll() {
    return this.rest.get('https://3030-manishdev-airbusbe-a2ckahr6wl7.ws-us38.gitpod.io/api/products')
  }

}
