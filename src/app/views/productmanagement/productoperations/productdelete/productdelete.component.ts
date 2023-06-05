import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServproductsService } from 'src/app/shared/services/servproducts.service';
import { ServutilsService } from 'src/app/shared/services/servutils.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-productdelete',
  templateUrl: './productdelete.component.html',
  styleUrls: ['./productdelete.component.css']
})
export class ProductdeleteComponent implements OnInit {
  id!: number;
  product!: Product;

  constructor(private servutils: ServutilsService, private servproducts: ServproductsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.servutils.verifyAdmin() !== "true") {
      this.router.navigate(['**']);
    } else {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

      if (this.id !== 0) {
        this.servproducts.getProductById(this.id).subscribe((data: Product[]) => {
          this.product = data[0];
          if (this.product) {
            this.id = Number(this.product.id);
          }
        })
      } else {
        this.router.navigate(['**']);
      }
    }
  }

  confirmDelete() {
    this.servproducts.deleteProduct(this.id).subscribe({});
    this.closeDialogBox();
    this.router.navigate(['productmanagement']);
  }

  closeDialogBox() {
    this.router.navigate(['productmanagement']);
  }
}
