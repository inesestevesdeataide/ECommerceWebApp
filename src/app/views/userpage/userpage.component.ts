import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServusersService } from '../../shared/services/servusers.service';
import { User } from "../../shared/models/user.model";
import { retry } from 'rxjs';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})

export class UserpageComponent implements OnInit {
  id!: number;
  user!: any;
  alteredUser!: User;

  form!: FormGroup;

  isOnEditMode: boolean = false;
  isChanged: boolean = false;

  constructor(private formBuilder: FormBuilder, private servusers: ServusersService, private router: Router) { }

  ngOnInit() {
    this.id = Number(sessionStorage.getItem('userId'));
    if (this.id !== 0) {
      this.servusers.getUserById(this.id)
        .pipe(
          retry(2)
        )
        .subscribe({
          next: (data: User[]) => {
            this.user = data[0];

            this.form = this.formBuilder.group({
              name: [this.user.name, Validators.required],
              email: [this.user.email, [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")]],
              password: [this.user.password, Validators.compose([
                Validators.required,
                Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)
              ])],
              password_confirm: ['', [Validators.required, this.matchPassword.bind(this)]],
              address: [this.user.address, Validators.compose([
                Validators.required,
                Validators.minLength(10)
              ])],
              zip: [this.user.zip, Validators.compose([
                Validators.required,
                Validators.pattern(/^\d{4}-\d{3}?$/)
              ])],
              country: [this.user.country, Validators.compose([
                Validators.required,
                Validators.minLength(2)
              ])],
              isAdmin: [this.user.isAdmin],
              isActive: [this.user.isActive],
              wishlist: [this.user.wishlist]
            });
          },
          error: (err: any) => {
            console.error('Error finding user:', err);
            this.router.navigate(['**']);
          }
        });
    } else {
      this.router.navigate(['**']);
    }
  }

  // TODO: SERVICE!
  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  hidePassword(password: string): string {
    return this.form.get('password') ? '•'.repeat(password.length) : '';
  }

  get password_confirm() {
    return this.form.get('password_confirm');
  }

  get address() {
    return this.form.get('address');
  }

  get zip() {
    return this.form.get('zip');
  }

  get country() {
    return this.form.get('country');
  }

  // TODO: SERVICE! - or get rid of the confirm_password?
  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password')?.value;
    const password_confirm = control.value;

    if (password !== password_confirm) {
      return { 'noMatch': true };
    } else {
      return null;
    }
  }

  editModeOn() {
    this.isOnEditMode = true;
  }

  saveChanges() {
    this.alteredUser = this.form.value;
    this.alteredUser.id = this.user.id;

    this.servusers.updateUserInfo(this.alteredUser)
      .subscribe({
        next: () => {
          this.isChanged = true;
          sessionStorage.setItem('userName', this.alteredUser.name);
        },
        error: () => {
          this.router.navigate(['**']);
        }
      });
  }

  goBack() {
    this.isOnEditMode = false;
  }
}