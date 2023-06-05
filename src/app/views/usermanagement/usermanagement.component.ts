import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServusersService } from '../../shared/services/servusers.service';
import { ServutilsService } from '../../shared/services/servutils.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})

export class UsermanagementComponent {
  usersList: User[] = [];

  constructor(private servutils: ServutilsService, private servusers: ServusersService, private router: Router) { }

  ngOnInit() {
    if (this.servutils.verifyAdmin() !== "true") {
      this.router.navigate(['**']);
    } else {
      this.displayUsers();
    }
  }

  displayUsers() {
    this.servusers.getUsers()
    .subscribe({
      next:
        (users) => {
          this.usersList = users.map(user => ({ ...user }));
        },
      error: err => {
        alert(err);
      }
    });
  }

  activateUser(user: User) {
    this.servusers.updateUserIsActive(Number(user.id), user.isActive).subscribe({
      error: (err) => {
        console.error("Error updating user status:", err);
      }
    });
  }
}