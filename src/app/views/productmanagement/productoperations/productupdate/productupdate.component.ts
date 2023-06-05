import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServproductsService } from 'src/app/shared/services/servproducts.service';
import { ServutilsService } from 'src/app/shared/services/servutils.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-productupdate',
  templateUrl: './productupdate.component.html',
  styleUrls: ['./productupdate.component.css']
})

export class ProductupdateComponent {
  id!: number;
  product!: Product;
  alteredProduct!: Product;
  form!: FormGroup;
  productTypes!: string[];
  maxFeaturedProducts: number = 8;

  constructor(private servutils: ServutilsService, private formBuilder: FormBuilder, private servproducts: ServproductsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.servutils.verifyAdmin() !== "true") {
      this.router.navigate(['**']);
    } else {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      if (this.id !== 0) {
        this.servproducts.getProductById(this.id).subscribe((data: Product[]) => {
          this.product = data[0];

          this.servproducts.getProductTypes().subscribe(types => {
            this.productTypes = types;
          })

          this.form = this.formBuilder.group({
            name: [this.product.name, Validators.required],
            brand: [this.product.brand, Validators.required],
            product_type: [this.product.product_type, Validators.required],
            color: [this.product.color, Validators.required],
            price: [this.product.price, Validators.required],
            description: [this.product.description, Validators.required],
            main_photo: [this.product.main_photo, Validators.required],
            sec_photo: [this.product.sec_photo, Validators.required],
            featured: [this.product.featured, Validators.required]
          })
        })
      } else {
        this.router.navigate(['**']);
      }
    }
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

  saveChanges() {
    this.alteredProduct = this.form.value;
    this.alteredProduct.id = this.product.id;

    if (!this.alteredProduct.featured) {
      this.servproducts.updateProduct(this.alteredProduct).subscribe({
        next: () => {
          alert(`O produto ${this.alteredProduct.name} foi actualizado com sucesso!`);
          this.router.navigate(['productmanagement']);
        },
        error: err => {
          this.router.navigate(['**']);
        }
      });
    } else {
      this.servproducts.getFeaturedProducts()
      .subscribe({
        next: data => {
          const dataLength = Object.keys(data).length;
          if (dataLength >= this.maxFeaturedProducts) {
            alert('Só pode ter 8 produtos em destaque em simultâneo!');
          } else {
            this.servproducts.updateProduct(this.alteredProduct).subscribe({
              next: () => {
                alert(`O produto ${this.alteredProduct.name} foi actualizado com sucesso!`);
                this.router.navigate(['productmanagement']);
              },
              error: err => {
                this.router.navigate(['**']);
              }
            });
          }
        },
        error: err => {
          console.error("Error updating product:", err);
          this.router.navigate(['**']);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['productmanagement']);
  }
}