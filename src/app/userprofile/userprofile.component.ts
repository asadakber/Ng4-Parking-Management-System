import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable,FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../user.service";
import { AngularFireAuth } from "angularfire2/auth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private router: Router,private fb: FormBuilder,private afauth: AngularFireAuth,private db: AngularFireDatabase,public userservice: UserService) { 
   
  }

  ngOnInit() {


    
    
   }

   

 
}


