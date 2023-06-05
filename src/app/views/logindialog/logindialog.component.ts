import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServusersService } from '../../shared/services/servusers.service';
import { User } from '../../shared/models/user.model';
import { map } from 'rxjs';
import { ServutilsService } from 'src/app/shared/services/servutils.service';

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})

export class LogindialogComponent {
  displayDialog: string = "none";

  @Output() userIsLogged: EventEmitter<boolean> = new EventEmitter<boolean>;
  isLogged!: boolean;
  @Output() welcomeMessageHelper: EventEmitter<string> = new EventEmitter<string>;
  loggedUserName: any;
  @Output() userIsAdmin: EventEmitter<boolean> = new EventEmitter<boolean>;
  isAdmin!: boolean;
  loggedAdmin!: any;

  allFieldsFilled: boolean = true;
  isValidEmail: boolean = true;
  userExists: boolean = true;
  isActive: boolean = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private servUsers: ServusersService, private servutils: ServutilsService) { }

  // TODO: SERVICE!
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  validateFilling() {
    this.clearInputs();
    return this.loginForm.value.email === "" || this.loginForm.value.password === "" ? false : true;
  }

  completeValidation() {
    if (!this.validateFilling()) {
      this.allFieldsFilled = false;
      return this.allFieldsFilled = false;
    } else {
      this.allFieldsFilled = true;
      if (this.servutils.validateEmail(String(this.loginForm.value.email))) {
        this.isValidEmail = true;
        return true;
      } else {
        this.isValidEmail = false;
        return false;
      }
    }
  }

  login() {
    if (this.completeValidation()) {
      this.servUsers.getUsers()
      .pipe(
        map((res) => res.find((user: User) => user.email === this.loginForm.value.email && user.password === this.loginForm.value.password))
      ).subscribe({
        next: (userFound) => {
          if (userFound && userFound.isActive) {
            this.userExists = true;

            sessionStorage.setItem('userId', String(userFound.id));
            sessionStorage.setItem('userName', userFound.name);
            sessionStorage.setItem('isAdmin', String(userFound.isAdmin));

            this.isActive = userFound.isActive;
            this.loggedUserName = sessionStorage.getItem('userName');
            this.loggedAdmin = sessionStorage.getItem('isAdmin');

            if (this.loggedUserName != undefined) {
              this.isLogged = true;
              this.userIsLogged.emit(this.isLogged);
              this.welcomeMessageHelper.emit(this.loggedUserName);
            } else {
              this.userIsLogged.emit(this.isLogged);
              this.userExists = false;
              this.isLogged = false;
            }

            if (this.loggedAdmin === "true") {
              this.isAdmin = true;
              this.userIsAdmin.emit(this.isAdmin);
            } else {
              this.isAdmin = false;
              this.userIsAdmin.emit(this.isAdmin);
            }

            this.closeDialogBox();
            this.router.navigate([""]);

          } else if (userFound && !userFound.isActive) {
            this.isActive = false;
          } else {
            this.userExists = false;
          }
        },
        error: (err) => {
          this.router.navigate(['**']);
        }
      });
    }
  }

  logout() {
    sessionStorage.clear();

    this.isLogged = false;
    this.userIsLogged.emit(this.isLogged);

    this.isAdmin = false;
    this.userIsAdmin.emit(this.isAdmin);

    this.router.navigate([""]);
  }

  openDialogBox() {
    this.displayDialog = "block";
  }

  closeDialogBox() {
    this.loginForm.reset();
    this.clearInputs();
    this.displayDialog = "none";
  }

  clearInputs() {
    this.allFieldsFilled = true;
    this.isValidEmail = true;
    this.userExists = true;
    this.isActive = true;
  }
}
