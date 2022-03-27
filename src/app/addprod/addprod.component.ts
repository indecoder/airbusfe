import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.scss']
})
export class AddprodComponent implements OnInit {

  product:{[key:string]: any} = {
    productId: '',
    categoryId: '',
    productname: '',
    description: '',
    unit: 0,
  };
  
  categories: any;
  btnDisabled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService,
  ) { }

  async ngOnInit() {
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

  validate(product:any) {
    if (product.productId) {
      if(product.categoryId) {
        if(product.productname) {
          if(product.description) {
            if (product.unit) {
              return true;
            } else {
              this.data.error('Please enter unit');
            }
          } else {
            this.data.error('Please enter description.');
          }
        } else {
          this.data.error('Please enter product name.')
        }
      } else {
        this.data.error('Please select product category');
      }
    } else {
      this.data.error('Please enter product id');
    }
    return false;
  }

  async add() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.product)) {
        
        const data:{[key:string]: any} = await this.rest.post(
          `${environment.apiurl}/api/products`,
          this.product
        )

        data['success']
          ? this.router.navigate(['/inventory'])
            .then(() => this.data.success(data['message']))
            .catch(error => this.data.error(error))
          : this.data.error(data['message']);
        }
      } catch (error: any) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }


}
