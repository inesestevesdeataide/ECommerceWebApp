import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdeleteComponent } from './productdelete.component';

describe('ProductdeleteComponent', () => {
  let component: ProductdeleteComponent;
  let fixture: ComponentFixture<ProductdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductdeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
