import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
@Component({
  selector: 'app-allviewusers',
  templateUrl: './allviewusers.component.html',
  styleUrls: ['./allviewusers.component.css']
})
export class AllviewusersComponent implements OnInit {
 fetchuser = [];
 user = [];
 items: FirebaseListObservable<any[]>;
 users: FirebaseListObservable<any[]>
 fetchkey = [];
 keys = [];
 fetchstarttime = [];
 fetchslot = [];
 key = [];
 fetchdata = [];
 dab = [];
  constructor(private afauth: AngularFireAuth,private db: AngularFireDatabase,public userservice: UserService) { 
   this.allusers();
   this.fetchb();
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

  fetchb() {
    this.items = this.db.list('/booking/', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.fetchslot = [];
        this.dab = [];
        snapshots.forEach(snapshot => {
          this.keys.push(snapshot.key)
          console.log(this.keys)
          snapshot.forEach(data => {
            this.key.push(data.key)
            console.log(data.key)
            this.dab.push(data.val());
            console.log(data.val())
          });
        })
      })
  }

  cancel(index) {
    this.db.list('/users/').remove(this.fetchuser[index]);
  }

  ngOnInit() {
  }

  logout() {
    this.userservice.logout();
  }

 



}
