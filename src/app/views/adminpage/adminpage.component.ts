import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServutilsService } from '../../shared/services/servutils.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor(private servutils: ServutilsService, private router: Router) { }

  ngOnInit() {
    if (this.servutils.verifyAdmin() !== "true") {
      this.router.navigate(['**']);
    }
  }
}