import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { retry, } from 'rxjs';
import { ServproductsService } from '../../shared/services/servproducts.service';
import { ServusersService } from '../../shared/services/servusers.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {
  wishlistIds: number[] = [];
  userId!: number;
  wishedItems: Product[] = [];
  imgRelativePath: string = "../../assets/images/";
  hasSomethingThere!: boolean;
  initialLength!: number;

  constructor(private servusers: ServusersService, private servproducts: ServproductsService, private router: Router) { }

  ngOnInit() {
    this.userId = Number(sessionStorage.getItem('userId'));
    if (this.userId !== 0) {
      this.getWishlistItems();
      this.initialLength = this.wishlistIds.length;
    } else {
      this.hasSomethingThere = false;
      this.router.navigate(['**']);
    }
  }

  getWishlistItems() {
    this.servusers.getWishlistItems(this.userId)
      .pipe(
        retry(2)
      )
      .subscribe({
        next: wishedIds => {
          this.wishlistIds = wishedIds;
          this.initialLength = this.wishlistIds.length;

          if (this.wishlistIds.length !== 0) {
            this.hasSomethingThere = true;
            this.getWishedItems();
          }
        },
        error: error => {
          console.error("Error fetching wishlist items:", error);
          this.router.navigate(['**']);
        }
      });
  }

  getWishedItems() {
    for (let i = 0; i < this.wishlistIds.length; i++) {
      const productId = this.wishlistIds[i];
      this.servproducts.getProductById(productId)
        .pipe(
          retry(2)
        )
        .subscribe({
          next: (product: Product[]) => {
            product[0].main_photo = this.imgRelativePath + product[0].main_photo;
            this.wishedItems.push(product[0]);
          },
          error: (error: HttpErrorResponse) => {
            console.error("Error fetching user's wishlist:", error);
            this.router.navigate(['**']);
          }
        });
    }
  }

  isNowInWishlist(product: Product) {
    return this.wishlistIds.includes(Number(product.id));
  }

  onDeleteFromWishlist(product: Product) {
    if (this.isNowInWishlist(product)) {
      const idToBeDeleted = Number(product.id);
      this.wishlistIds = this.wishlistIds.filter(id => id !== idToBeDeleted);
      this.wishedItems = this.wishedItems.filter(item => item.id !== product.id);

      this.onUpdateWishlist(product);

      if (this.wishlistIds.length === 0) {
        this.hasSomethingThere = false;
      }
    }
  }

  onUpdateWishlist(product: Product) {
    this.servusers.updateWishlist(this.userId, this.wishlistIds)
      .pipe(
        retry(2)
      )
      .subscribe({
        next: () => {
        },
        error: (err) => {
          console.error("Error updating user's wishlist:", err);
          this.router.navigate(['**']);
        }
      });
  }
}