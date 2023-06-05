import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupuserexistsinfodialogComponent } from './signupuserexistsinfodialog.component';

describe('SignupuserexistsinfodialogComponent', () => {
  let component: SignupuserexistsinfodialogComponent;
  let fixture: ComponentFixture<SignupuserexistsinfodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupuserexistsinfodialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupuserexistsinfodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
