import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  id!: number;
  isLogged!: boolean;
  isAdmin!: boolean;
  userName!: string | null;

  ngOnInit() {
    // TODO: SERVICE!!! IT'S EVERYWHERE
    this.id = Number(sessionStorage.getItem('userId'));
    if (this.id !== 0) {
      this.isLogged = true;
      this.userName = sessionStorage.getItem('userName');
    } else {
      this.isLogged = false;
    }

    if (sessionStorage.getItem('isAdmin') !== "false" && sessionStorage.getItem('isAdmin') != null) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  userIsLoggedHandler(valueEmitted: boolean) {
    this.isLogged = valueEmitted;
  }

  welcomeMessageHandler(username: string) {
    this.userName = username;
  }

  userIsAdminHandler(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }
}