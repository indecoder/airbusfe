import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editprod',
  templateUrl: './editprod.component.html',
  styleUrls: ['./editprod.component.scss']
})
export class EditprodComponent implements OnInit {
  id:any;

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
    private ar: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private rest: RestApiService,
  ) { }

  async ngOnInit() {
    this.ar.params.subscribe({
      next : (x:Params) => {this.id = x['id']}
    })
    
    try{
      const data:{[x:string]: any} = await this.rest.get(
        `${environment.apiurl}/api/category`
      );
      data['success']
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);

      const data2:{[x:string]: any} = await this.rest.get(`${environment.apiurl}/api/product/${this.id}`)
      data2['success']
        ? (() => {
          this.product['productId'] = data2['product']['id'];
          this.product['categoryId'] = data2['product']['category']['_id'];
          this.product['productname'] = data2['product']['name'];
          this.product['description'] = data2['product']['description'];
          this.product['unit'] = data2['product']['unit'];
        })()
        : this.data.error(data2['message']);
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

  async update() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.product)) {
        
        const data:{[key:string]: any} = await this.rest.post(
          `${environment.apiurl}/api/product/${this.id}`,
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
