import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { ServproductsService } from '../../shared/services/servproducts.service';
import { ServusersService } from '../../shared/services/servusers.service';
import { Product } from '../../shared/models/product.model';

@Component({
    selector: 'app-manproductspage',
    templateUrl: './manproductspage.component.html',
    styleUrls: ['./manproductspage.component.css']
})

export class ManproductspageComponent implements OnInit {
    userId!: number;
    isLogged!: boolean;

    productList: Product[] = [];
    productListTemp: Product[] = [];

    canViewMore: boolean = false;
    imgRelativePath: string = "../../assets/images/";

    regularBehaviour: boolean = true;
    filteredToDisplay!: Product[];
    resultCount: number = 0;

    wishedIds!: number[];
    inWishlist!: boolean;

    constructor(private servusers: ServusersService, private servproducts: ServproductsService, private router: Router) { }

    ngOnInit() {
        this.userId = Number(sessionStorage.getItem('userId'));
        this.isLogged = (this.userId !== 0) ? true : false;
        if (this.isLogged) {
            this.getWishedItems();
        }
        this.displayProducts();
    }

    onFilterOn(filteredProducts: Product[]) {
        this.regularBehaviour = false;
        this.filteredToDisplay = filteredProducts;
        this.productListTemp = this.filteredToDisplay;
        this.displayProducts();
    }

    onFilterOff() {
        this.regularBehaviour = true;
        this.displayProducts();
    }

    getWishedItems() {
        this.servusers.getWishlistItems(this.userId).subscribe({
            next: wishedIds => {
                this.wishedIds = wishedIds;
            }
        });
    }

    processProducts(productList: Product[]) {
        for (let i = 0; i < productList.length; i++) {
            productList[i].main_photo = this.imgRelativePath + productList[i].main_photo;
            productList[i].sec_photo = this.imgRelativePath + productList[i].sec_photo;
        }
    }

    displayProducts() {
        if (this.regularBehaviour) {
            this.servproducts.getProducts()
                .pipe(
                    retry(2)
                ).subscribe({
                    next: products => {
                        this.productList = products;

                        this.resultCount = this.productList.length;
                        this.canViewMore = this.productList.length > 6;

                        this.processProducts(this.productList);
                        this.productListTemp = this.productList.slice(0, 6);
                    },
                    error: err => {
                        this.router.navigate(['**']);
                    }
                });
        } else {
            this.processProducts(this.filteredToDisplay);
            this.productListTemp = this.filteredToDisplay.slice(0, 6);

            this.resultCount = this.filteredToDisplay.length;
            this.canViewMore = this.filteredToDisplay.length > 6;
        }
    }

    loadMore() {
        const lastIndex = this.productListTemp.length + 6;
        if (this.regularBehaviour) {
            this.productListTemp = this.productList.slice(0, lastIndex);
            this.canViewMore = this.productList.length > lastIndex;
        } else {
            this.productListTemp = this.filteredToDisplay.slice(0, lastIndex);
            this.canViewMore = this.filteredToDisplay.length > lastIndex;
        }
    }

    isNowInWishlist(product: Product) {
        return this.wishedIds.includes(Number(product.id));
    }

    toggleWishedItem(product: Product) {
        if (this.isNowInWishlist(product)) {
            const idToBeDeleted = Number(product.id);
            this.wishedIds = this.wishedIds.filter(id => id !== idToBeDeleted);

            this.onUpdateWishlist(product);

            // Just enough for the stars to update before the message pops up
            setTimeout(() => {
                alert(`Produto '${product.name}' removido da wishlist`);
            }, 10);
        } else {
            this.wishedIds.push(Number(product.id));
            this.onUpdateWishlist(product);

            setTimeout(() => {
                alert(`Produto '${product.name}' adicionado à wishlist`);
            }, 10);
        }
    }

    onUpdateWishlist(product: Product) {
        this.servusers.updateWishlist(this.userId, this.wishedIds)
            .subscribe({
                next: () => {
                    this.getWishedItems();
                },
                error: (err) => {
                    console.error(`Error sending info on product ${product.id} to user's wishlist:`, err);
                    this.router.navigate(['**']);
                }
            });
    }
}