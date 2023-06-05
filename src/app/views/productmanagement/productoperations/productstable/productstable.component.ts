import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServproductsService } from 'src/app/shared/services/servproducts.service';
import { ServutilsService } from 'src/app/shared/services/servutils.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-productstable',
  templateUrl: './productstable.component.html',
  styleUrls: ['./productstable.component.css'],
  providers: [NgbPaginationConfig]
})

export class ProductstableComponent {
  @Output() triggeredId: EventEmitter<number> = new EventEmitter();
  @Input() productList: Product[] = [];
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  maxFeaturedProducts: number = 8;

  constructor(private servutils: ServutilsService, private servproducts: ServproductsService, private router: Router) { }

  changeProductHandler(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.triggeredId.emit(id);
  }

  toggleFeatured(product: Product) {
    if (product.featured) {
      product.featured = false;
      this.servutils.updateProductFeaturedStatus(product, false);
    } else {
      this.servproducts.getFeaturedProducts().subscribe({
        next: (data) => {
          const dataLength = Object.keys(data).length;
          if (dataLength >= this.maxFeaturedProducts) {
            alert('Só pode ter 8 produtos em destaque em simultâneo! Para destacar este produto, por favor desmarque pelo menos um dos destacados actualmente.');
          } else {
            product.featured = true;
            this.servutils.updateProductFeaturedStatus(product, true);
          }
        },
        error: (err) => {
          console.error(err);
          this.router.navigate(['**']);
        }
      });
    }
  }
}