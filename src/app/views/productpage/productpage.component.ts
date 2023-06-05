import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServproductsService } from '../../shared/services/servproducts.service';
import { Product } from '../../shared/models/product.model';
import { map, retry } from 'rxjs';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {
  id!: number;
  product!: Product;
  imgRelativePath: string = "../../assets/images/";

  constructor(private servproducts: ServproductsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.generateProductPage(id);
  }

  generateProductPage(id: string | null) {
    this.servproducts.getProducts()
      .pipe(
        retry(2),
        map((res: any) => {
          const productFound = res.find((product: any) => {
            return product.id == id;
          });
          if (productFound) {
            productFound.main_photo = this.imgRelativePath + productFound.main_photo;
            productFound.sec_photo = this.imgRelativePath + productFound.sec_photo;
  
            return productFound;
          }
        })
      )
      .subscribe({
        next: (productFound) => {
          if (productFound) {
            this.product = productFound;
          }
        },
        error: (err) => {
          console.error("Error generating product page:", err);
          this.router.navigate(['**']);
        }
      });
  }
}