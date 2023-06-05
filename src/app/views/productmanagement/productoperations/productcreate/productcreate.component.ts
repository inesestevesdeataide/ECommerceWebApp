import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServproductsService } from 'src/app/shared/services/servproducts.service';
import { Product } from 'src/app/shared/models/product.model';
import { retry } from 'rxjs';
import { ServutilsService } from 'src/app/shared/services/servutils.service';


@Component({
  selector: 'app-productcreate',
  templateUrl: './productcreate.component.html',
  styleUrls: ['./productcreate.component.css']
})

export class ProductcreateComponent implements OnInit {
  @Output() productAdded = new EventEmitter<Product>();
  product!: Product;
  productTypes!: string[];
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private servproducts: ServproductsService, private servutils: ServutilsService, private router: Router) { }

  ngOnInit() {
    this.servproducts.getProductTypes()
      .pipe(
        retry(2)
      )
      .subscribe(types => {
        this.productTypes = types;
      });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      product_type: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      main_photo: ['', Validators.required],
      sec_photo: ['', Validators.required],
      featured: [false]
    })
  }

  // TODO: SERVICE!
  get name() {
    return this.form.get('name');
  }

  get brand() {
    return this.form.get('brand');
  }

  get product_type() {
    return this.form.get('product_type');
  }

  get color() {
    return this.form.get('color');
  }

  get price() {
    return this.form.get('price');
  }

  get description() {
    return this.form.get('description');
  }

  get main_photo() {
    return this.form.get('main_photo');
  }

  get sec_photo() {
    return this.form.get('sec_photo');
  }

  get featured() {
    return this.form.get('featured');
  }

  save() {
    this.product = this.form.value;

    this.servproducts.getFeaturedProducts()
      .pipe(
        retry(2)
      )
      .subscribe({
        next: (data) => {
          const dataLength = Object.keys(data).length;
          const isMarkedFeatured = this.form.value.featured === true ? true : false;
          if (isMarkedFeatured && dataLength >= 8) {
            alert("Só pode ter 8 produtos em destaque!");
          } else {
            this.servproducts.insertProduct(this.product)
              .pipe(
                retry(2)
              )
              .subscribe({
                next: () => {
                  alert(`Produto ${this.product.name} inserido com sucesso!`);
                  this.productAdded.emit(this.product);
                  this.form.reset();
                },
                error: (err) => {
                  console.error("Error inserting product:", err);
                  this.router.navigate(['**']);
                }
              });
          }
        },
        error: (err) => {
          console.error("Error getting featured products:", err);
          this.router.navigate(['**']);
        }
      });
  }
}