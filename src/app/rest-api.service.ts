import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private http: HttpClient) { }

  getHeaders(form?: boolean) {
    const token = localStorage.getItem('token');
    if(form) {
      return token ? new HttpHeaders({
        'Authorization': token
      }) : new HttpHeaders({})
    } else {
      return token ? new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      }) : new HttpHeaders({})
    }
    
  }

  get(link: string) {
    return lastValueFrom(this.http.get(link, { headers: this.getHeaders() }));
  }

  post(link: string, body: any, form?: boolean) {
    return lastValueFrom(this.http.post(link, body, { headers: this.getHeaders(form) }));
  }

  delete(link: string) {
    return lastValueFrom(this.http.delete(link, { headers: this.getHeaders() }));
  }
}
