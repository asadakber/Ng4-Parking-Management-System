import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-parking-dashboard',
  templateUrl: './parking-dashboard.component.html',
  styleUrls: ['./parking-dashboard.component.css']
})
export class ParkingDashboardComponent implements OnInit {

  constructor(private router: Router,public userservice: UserService) {
    
   }
  
  ngOnInit() {
  
  }



  logout() {
    this.userservice.logout();
  }

}
