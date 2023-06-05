import { Injectable } from '@angular/core';
import { ServproductsService } from './servproducts.service';
import { Product } from '../models/product.model';
import { BehaviorSubject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServutilsService {
  isAdmin!: string | null;

  constructor(private servproducts: ServproductsService) { }

  // Access validations
  validateEmail(input: string | null | undefined) {
    const emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$");
    return emailRegex.test(String(input));
  }

  verifyAdmin() {
    return this.isAdmin = sessionStorage.getItem('isAdmin');
  }

  // Support product update
  updateProductFeaturedStatus(product: Product, isFeatured: boolean) {
    this.servproducts.updateProductIsFeatured(Number(product.id), isFeatured)
    .pipe(
      retry(2) 
    )
    .subscribe({
      next: () => alert(`O produto ${product.name} foi actualizado. Novo estado: ${isFeatured === true ? 'Destacado' : 'Não destacado'}`),
      error: (err) => console.error(err),
    });
  }
}