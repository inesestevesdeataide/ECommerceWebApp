import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-productsearch',
  templateUrl: './productsearch.component.html',
  styleUrls: ['./productsearch.component.css']
})
export class ProductsearchComponent {
  @Output() insertedValue : EventEmitter<string> = new EventEmitter();
  cSearch: string = '';

  processSearch() {
    this.insertedValue.emit(this.cSearch);
  }

  clearSearch() {
    this.cSearch='';
    this.insertedValue.emit(this.cSearch);
  }
}
