import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveuserchangesinfodialogComponent } from './saveuserchangesinfodialog.component';

describe('SaveuserchangesinfodialogComponent', () => {
  let component: SaveuserchangesinfodialogComponent;
  let fixture: ComponentFixture<SaveuserchangesinfodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveuserchangesinfodialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveuserchangesinfodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
