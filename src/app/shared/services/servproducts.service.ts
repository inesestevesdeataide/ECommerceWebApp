import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ServproductsService {
  private urlAPI : string ="http://localhost:3000/products";

  constructor(private http: HttpClient) { }

  private processError(error : HttpErrorResponse) {
    let message = "";
    if (error.status === 404) {
      message = "Page does not exist";
    } else {
      message = "An error occurred";
    }
    const err = new Error(message);
    return throwError(()=>err);
  }
  
  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.urlAPI)
      .pipe(
        catchError(this.processError)
      );
  }

  getProductById(id: number): any {
    return this.http.get(`${this.urlAPI}/?id=${id}`)
    .pipe(
      catchError(this.processError)
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<any>(`${this.urlAPI}/${id}`)
    .pipe(
      catchError(this.processError)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.urlAPI}/${product.id}`, product)
    .pipe(
      catchError(this.processError)
    );
  }

  insertProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.urlAPI, product)
    .pipe(
      catchError(this.processError)
    );
  }

  getFeaturedProducts(): Observable<Product> {
    return this.http.get<Product>(`${this.urlAPI}?featured_like=true`)
    .pipe(
      catchError(this.processError)
    );
  }

  getProductTypes(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/product_types`)
    .pipe(
      catchError(this.processError)
    );
  } 

  updateProductIsFeatured(id: number, featured: boolean): Observable<Product> {
    return this.http.patch<Product>(`${this.urlAPI}/${id}/`, { featured: featured })
    .pipe(
      catchError(this.processError)
    );
  }
}