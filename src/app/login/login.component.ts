import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  btnDisabled = false;

  constructor(private router: Router, private data: DataService, private rest: RestApiService) { }

  ngOnInit() {
  }

  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.data.error('Password not entered');
      }
    } else {
      this.data.error('Email is not entered.');
    }
    return false;
  }

  async login() {
    this.btnDisabled = true;

    try {
      if (this.validate()) {
        const data:any = await this.rest.post(`${environment.apiurl}/api/accounts/login`, {
          email: this.email,
          password: this.password
        });
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this.data.getProfile();
          this.router.navigate(['/inventory']);
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error:any) {
      this.data.error(error['message']);
    }

    this.btnDisabled = false;
  }

}
