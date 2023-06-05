import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManproductspageComponent } from './manproductspage.component';

describe('ManproductspageComponent', () => {
  let component: ManproductspageComponent;
  let fixture: ComponentFixture<ManproductspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManproductspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManproductspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
