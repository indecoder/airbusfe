import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';

  btnDisabled = false;

  constructor(private data: DataService, private rest: RestApiService, private router: Router) { }

  ngOnInit(): void {
  }

  validate() {
    if (this.name) {
      if(this.email) {
        if(this.password) {
          if(this.password1) {
            if(this.password === this.password1) {
              return true;
            } else {
              this.data.error('password do not match');
            }
          } else {
            this.data.error('confirm password is not entered');
          }
        } else {
          this.data.error('password is not entered');
        }
      } else {
        this.data.error('Email is not entered');
      }
    } else {
      this.data.error('Name is not entered');
    }
    return false;
  }

  async register() {
    this.btnDisabled = true;
    try {
      if(this.validate()) {
        const data:any = await this.rest.post(
          `${environment.apiurl}/api/accounts/signup`,
          {
            name: this.name,
            email: this.email,
            password: this.password
          }
        )

        if(data['success']) {
          this.data.success('Registation Successfull, you will be redirected to login page in 5 sec');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000)
        } else {
          this.data.error(data['message']);
        }
      }
    } catch(error: any) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
