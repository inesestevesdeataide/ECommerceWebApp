import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServproductsService } from 'src/app/shared/services/servproducts.service';
import { ServutilsService } from 'src/app/shared/services/servutils.service';
import { Product } from 'src/app/shared/models/product.model';
import { retry } from 'rxjs';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})

export class ProductmanagementComponent {
  productList: Product[] = [];
  tempProductList: Product[] = [];
  imgRelativePath: string = "../../assets/images/";

  vSearch: string = '';

  constructor(private servproducts: ServproductsService, private servutils: ServutilsService, private router: Router) { }

  ngOnInit() {
    if (this.servutils.verifyAdmin() !== "true") {
      this.router.navigate(['**']);
    } else {
      // this.displayProducts();
      this.servproducts.getProducts()
        .pipe(
          retry(2)
        )
        .subscribe({
          next: products => {
            for (let i = 0; i < products.length; i++) {
              products[i].main_photo = this.imgRelativePath + products[i].main_photo;
              products[i].sec_photo = this.imgRelativePath + products[i].sec_photo;
            }
            this.productList = products;
            this.tempProductList = products;
          },
          error: err => {
            this.router.navigate(['**']);
          }
        });
    }
  }

  onProductAdded(product: Product) {
    product.main_photo = this.imgRelativePath + product.main_photo;
    product.sec_photo = this.imgRelativePath + product.sec_photo;
    this.productList.push(product);
  }

  search(search: string) {
    if (search !== '') {
      this.tempProductList = this.searchProducts(search);
      this.vSearch = search;
      this.tempProductList = this.productList.filter(s => s.name.toUpperCase().includes(search.toUpperCase()));
    } else {
      this.tempProductList = this.productList;
    }
  }

  searchProducts(search: string): Product[] {
    return this.productList.filter(product => product.name.toUpperCase().includes(search.toUpperCase()));
  }

  deleteProduct(id: number) {
    this.servproducts.deleteProduct(id); 
      alert(`O produto com id ${id} foi removido com sucesso!`);
  }
}

