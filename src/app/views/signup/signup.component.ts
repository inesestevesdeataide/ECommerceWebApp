import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServusersService } from '../../shared/services/servusers.service';
import { User } from '../../shared/models/user.model';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  isRegistered: boolean = false;

  constructor(private formBuilder: FormBuilder, private servusers: ServusersService, private http: HttpClient, private router: Router) { }

  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")]],
    password: ['', Validators.compose([
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)
    ])],
    password_confirm: ['', [Validators.required, this.matchPassword.bind(this)]],
    address: ['', Validators.compose([
      Validators.required,
      Validators.minLength(10)
    ])],
    zip: ['', Validators.compose([
      Validators.required,
      Validators.pattern(/^\d{4}-\d{3}?$/)
    ])],
    country: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2)
    ])],
    isActive: [false],
    isAdmin: [false],
    wishlist: [[]]
  })

  // TODO: SERVICE!
  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get password_confirm() {
    return this.signUpForm.get('password_confirm');
  }

  get address() {
    return this.signUpForm.get('address');
  }

  get zip() {
    return this.signUpForm.get('zip');
  }

  get country() {
    return this.signUpForm.get('country');
  }

  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password')?.value;
    const password_confirm = control.value;

    if (password !== password_confirm) {
      return { 'noMatch': true };
    } else {
      return null;
    }
  }

  signUp() {
    this.servusers.getUsers().pipe(
      switchMap((users: User[]) => {
        const emailInUse = users.some(user => user.email === this.signUpForm.value.email);
        if (emailInUse) {
          alert("Este e-mail já se encontra registado!");
          return EMPTY; 
        } else {
          const newUser: User = {
            name: String(this.name!.value),
            email: String(this.email!.value),
            password: String(this.password!.value),
            address: String(this.address!.value),
            zip: String(this.zip!.value),
            country: String(this.country!.value),
            isAdmin: Boolean(this.signUpForm.value.isAdmin),
            isActive: Boolean(this.signUpForm.value.isActive),
            wishlist: []
          };
          return this.servusers.createUser(newUser);
        }
      })
    ).subscribe({
      next: () => {
        this.isRegistered = true;
        this.signUpForm.reset();
      },
      error: err => {
        this.router.navigate(['**']);
      }
    });
  }
}