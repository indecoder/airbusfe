import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  delspin = false;

  categories: any;
  selcatid = null;
  srchtxt = '';

  products:any;

  constructor(private data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    this.getProducts();
    try{
      const data:{[x:string]: any} = await this.rest.get(
        `${environment.apiurl}/api/category`
      );
      data['success']
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);
    } catch (error: any) {
      this.data.error(error['message']);
    }
  }

  getProducts() {
    this.data.getAll().then((x:{[key:string]: any}) => {
      this.products = x['products'];
    });
  }

  delete(pid:string) {
    let elref = document.getElementById('sp'+pid)!;
    elref.classList.add('spinner-border' ,'spinner-border-sm');
    this.rest.delete(`${environment.apiurl}/api/product/${pid}`).then((next) => {
      this.getProducts();
      elref.classList.remove('spinner-border' ,'spinner-border-sm');
      next;
    }
  )}

  async searchCat() {
    if(this.selcatid && this.srchtxt !== '') {
      let payload = {
        catid: this.selcatid,
        searchTxt: this.srchtxt
      }
      
      const data:{[x:string]: any} = await this.rest.post(
        `${environment.apiurl}/api/categorysearch`,payload
      );
      console.log(data);
      data['success']
        ? (() => {
          this.products = data['products'];
        })()
        : this.data.error(data['message']);
    }
  }

  reset() {
    this.selcatid = null;
    this.srchtxt = '';
    this.getProducts();
  }
}
