import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ChatserviceService } from '../chatservice.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FormGroup } from "@angular/forms/forms";
import { FormControl } from "@angular/forms/src/forms";
import { Validators } from "@angular/forms/src/validators";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  uid;
  message;
  items: FirebaseListObservable<any[]>;
  profiles: FirebaseListObservable<any[]>
  fetchslot = [];
  key;
  constructor(private router: Router,private afauth: AngularFireAuth, private chatService: ChatserviceService,public userservice: UserService,private db:AngularFireDatabase) { 
    this.profiles = this.db.list("feedback/" + this.afauth.auth.currentUser.uid);
  }

  ngOnInit() {
   
  }

  send() {
    this.uid = this.afauth.auth.currentUser.uid;
    this.items = this.db.list('/users/' + this.uid, { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.fetchslot = [];
        snapshots.forEach(snapshot => {
          this.key = (snapshot.val().name)
          console.log(snapshot.val().name)
        })
      })
    this.uid = this.afauth.auth.currentUser.uid;
    let data = { name: this.key, messages: this.message }
    this.db.list("/feedback/" + this.uid + "/").push(data);
  }

  

  logout() {
    this.userservice.logout();
  }
   
}
