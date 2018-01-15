import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
  
})
export class SignInComponent implements OnInit {
  email;
  password;
  // loginForm: FormGroup;
  constructor(private userservice: UserService, private fb: FormBuilder, private router: Router ) {
    // this.createForm();
   }

  ngOnInit() {

  }

  // createForm() {
  //   this.loginForm = this.fb.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required]
  //   })
  // }

  login()  {
    this.userservice.signin(this.email, this.password)
    this.email = '';
    this.password = ''
    }
  //   this.userservice.signin(this.loginForm.value)
  //   .then((login)=> {
  //     this.userservice.getUserProfile().subscribe((profile)=> {
  //       if(profile == null) { 
  //         // alert("You Are Blocked By Admin");
  //         // this.userservice.logout();
  //       }
  //       else if (profile.type == 'admin') {
  //         this.router.navigate(['/adminparkingdashboard'])
  //       }
  //       else {
  //         this.router.navigate(['/bookparking'])
  //       }
  //     })
  //   })
  // }

}
