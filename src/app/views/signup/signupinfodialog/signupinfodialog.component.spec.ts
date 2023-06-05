import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupinfodialogComponent } from './signupinfodialog.component';

describe('SignupinfodialogComponent', () => {
  let component: SignupinfodialogComponent;
  let fixture: ComponentFixture<SignupinfodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupinfodialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupinfodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
