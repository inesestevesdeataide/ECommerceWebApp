import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServproductsService } from '../../../../../shared/services/servproducts.service';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-deleteproductdialog',
  templateUrl: './deleteproductdialog.component.html',
  styleUrls: ['./deleteproductdialog.component.css']
})

export class DeleteproductdialogComponent {
  @Input() product! : Product;
  @Output() closes : EventEmitter<boolean> = new EventEmitter();
  hide!: boolean;

  constructor(private servproducts: ServproductsService) {}

  confirmDelete(id: number) {
    this.servproducts.deleteProduct(id).subscribe();
    this.closeDialogBox();
    this.servproducts.getProducts();
  }

  closeDialogBox() {
    console.log("cancels")
    this.closes.emit();
  }
}