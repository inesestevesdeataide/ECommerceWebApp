import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ServproductsService } from '../../../shared/services/servproducts.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  @Input() productList!: Product[];
  @Output() filterTriggered = new EventEmitter<Product[]>();
  @Output() filterOff = new EventEmitter<boolean>();

  @ViewChild('typeInput') typeInput!: ElementRef;
  @ViewChild('colorInput') colorInput!: ElementRef;

  selectedColor!: string;
  selectedType!: string;
  filterOn!: boolean;
  colors!: string[];
  types!: string[];
  filteredProducts!: Product[];

  constructor(private servproducts: ServproductsService) { }

  ngOnInit() {
    this.selectedColor = '';
    this.selectedType = '';

    this.servproducts.getProductTypes()
      .subscribe(res => {
        this.types = res.sort();
      });

    this.servproducts.getProducts()
      .subscribe(products => {
        const uniqueColors = [...new Set(products.map(product => product.color))];
        this.colors = uniqueColors.sort();
      });
  }

  onFilterTriggered() {
    this.filterOn = true;
    this.filteredProducts = this.productList;

    if (this.selectedType) {
      this.filteredProducts = this.filteredProducts.filter(product => product.product_type === this.selectedType);
    }

    if (this.selectedColor) {
      this.filteredProducts = this.filteredProducts.filter(product => product.color === this.selectedColor);
    }

    this.filterTriggered.emit(this.filteredProducts);
  }

  clear(typeInput: any, colorInput: any) {
    this.selectedType = '';
    this.selectedColor = '';
    typeInput.checked = false;
    colorInput.checked = false;
    this.filteredProducts = this.productList;
    this.filterOn = false;
    this.filterOff.emit(this.filterOn);
  }
}