import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  db: any;
  name;
  email;
  password;
  contactno;
  address;
  type;
  // signupForm: FormGroup;
  constructor(private fb: FormBuilder, public userservice: UserService) {
    // this.createForm();
  }

  ngOnInit() {
  
  }
 

//  createForm() {
//   this.signupForm = this.fb.group({
//     username: ['', Validators.required] ,
//     email: ['', Validators.required],
//     password: ['', Validators.required],
//     contactNo: ['', Validators.required],
//     address: ['', Validators.required],
//     type: 'user'
//    })
//  }

  signup() {
    this.userservice.signup(this.name,this.email,this.password,this.contactno,this.address, this.type);
    this.name = '';
    this.email = '';
    this.password = '';
    this.contactno = '';
    this.address = '';
    this.type = '';
  }
}

