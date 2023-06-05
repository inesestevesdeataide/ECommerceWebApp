import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServproductsService } from '../../../shared/services/servproducts.service';
import { Product } from '../../../shared/models/product.model';
import { retry } from 'rxjs';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})

export class FeaturedComponent implements OnInit{
  featuredProductsList: Product[] = [];
  imgRelativePath: string = "../../assets/images/";

  constructor(private servproducts: ServproductsService, private router: Router) {}

  ngOnInit() {
    this.servproducts.getProducts()
    .pipe(
      retry(2)
    )
    .subscribe({
      next: products => {
          for (let i = 0; i < products.length; i++) {
            if (products[i].featured === true) {
              products[i].main_photo = this.imgRelativePath + products[i].main_photo;
              products[i].sec_photo = this.imgRelativePath + products[i].sec_photo;
              this.featuredProductsList.push(products[i]);
            }
          }
      },
      error: err => {
          this.router.navigate(['**']);
      }
  });
  }
}