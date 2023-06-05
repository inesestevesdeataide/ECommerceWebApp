import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteproductdialogComponent } from './deleteproductdialog.component';

describe('DeleteproductdialogComponent', () => {
  let component: DeleteproductdialogComponent;
  let fixture: ComponentFixture<DeleteproductdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteproductdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteproductdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
