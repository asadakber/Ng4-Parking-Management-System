import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFireDatabase,FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { ChatserviceService } from '../chatservice.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  currentPersonIndex: any;
  showChat: FirebaseListObservable<any>;
  uid;
  sendfeedback: FirebaseListObservable<any>
  items: FirebaseListObservable<any[]>
  fetchslot = [];
  key = [];
  allusersprofile = [];
  alluserskeys = [];
  profiles: FirebaseListObservable<any[]>;
  adminreply;
  adkey;
  fetchuser = [];
  user = [];
  users: FirebaseListObservable<any[]>
  constructor(public userservice: UserService,private chatservice: ChatserviceService, private afauth: AngularFireAuth,private router: Router,private db: AngularFireDatabase, private fb: FormBuilder) {
    this.find(this);
    this.allusers();
   }

  ngOnInit() {
   
  }

  allkeys = [];
  find(key) {
    this.items = this.db.list('/users/', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.allusersprofile = [];
        this.fetchslot = [];
        snapshots.forEach(snapshot => {
          console.log(snapshot.key)
          console.log(snapshot.val())
          this.key.push(snapshot.key)
          snapshot.forEach(data => {
            this.alluserskeys.push(data.key)
            console.log(data.key)
            console.log(data.val().name)
            this.allusersprofile.push(data.val());
          })
        })
      })
    this.currentPersonIndex = key;
    this.profiles = this.db.list("feedback/" + this.key[key])
    console.log(this.key[key]);
  }

  reply() {
    this.items = this.db.list('/users/', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.fetchslot = [];
        snapshots.forEach(snapshot => {
          console.log(snapshot.key)
          console.log(snapshot.val())
          this.key.push(snapshot.key)
        })
      })

    this.chatservice.sendReply(this.key[this.currentPersonIndex], { name: "admin", message: this.adminreply });
  }

  allusers() {
    this.users = this.db.list('/users/', {preserveSnapshot:true});
    this.users.subscribe(snapshot => {
      this.fetchuser = [];
      this.user = [];
      snapshot.forEach(snapshot => {
        this.fetchuser.push(snapshot.key);
        snapshot.forEach(data => {
          this.user.push(data.val());
        })
      })
    })

  }



}

