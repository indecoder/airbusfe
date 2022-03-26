import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  delspin = false;

  products:any;

  constructor(private data: DataService, private rest: RestApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.data.getAll().then((x:{[key:string]: any}) => {
      this.products = x['products'];
    });
  }

  delete(pid:string) {
    this.delspin = true;
    this.rest.delete(`https://3030-manishdev-airbusbe-a2ckahr6wl7.ws-us38.gitpod.io/api/product/${pid}`).then((next) => {
      this.getProducts();
      next;
    }
  )}

}
