import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SlotReservationService } from '../slot-reservation.service';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
@Component({
  selector: 'app-viewbooking',
  templateUrl: './viewbooking.component.html',
  styleUrls: ['./viewbooking.component.css']
})
export class ViewbookingComponent implements OnInit {
  viewprofile: FirebaseListObservable<any>;
  profile: FirebaseListObservable<any>;
  bookview:FirebaseListObservable<any>;
  Book = [];
  bookkey = [];
  table = [];
  key = [];
  tablekey = []; 
  arr = []
  constructor(private afauth: AngularFireAuth,public userservice: UserService, private db: AngularFireDatabase, private slotreservationservice: SlotReservationService) {
  this.bookView();
   this.book();
   this.viewbook();
   }

 

  ngOnInit() {
    
  }


  bookView(){
    this.viewprofile = this.db.list('/cantt-station/' , {preserveSnapshot:true});
    this.viewprofile.subscribe(snapshot => {
      this.tablekey = [];
      this.arr = [];
      snapshot.forEach(snapshot => {
        this.tablekey.push(snapshot.key);
        // console.log(snapshot.key);
        snapshot.forEach(data => {
           this.arr.push(data.val());
          // console.log(data.val());
        })
      })
    })
console.log("clicked")
  }

  book() {
    this.profile = this.db.list('/Jinnah-International-Airport/', {preserveSnapshot: true})
    this.profile.subscribe(user =>{
      this.table.length=  0;
    user.forEach(element => { 
      element.forEach(val => {
    this.table.push(val.val());
    this.key.push(element.key);

});
    })
})
  }

  viewbook() {
    this.bookview = this.db.list('/The-Palace-Mall/', {preserveSnapshot: true})
    this.bookview.subscribe(user =>{
      this.Book.length = 0;
    user.forEach(element => { 
      element.forEach(val => {
    this.Book.push(val.val());
    this.bookkey.push(element.key);

});
    })
})
  }

  cancel(index) {
    this.db.list('/cantt-station/').remove( this.tablekey[index])
  }

  delete(i) {
    const  key = this.key[i]
    this.db.list('/Jinnah-International-Airport/' + key, {preserveSnapshot:true}).remove()
  }

  del(i) {
    const  key = this.bookkey[i]
    this.db.list('/The-Palace-Mall/' + key, {preserveSnapshot:true}).remove()
  }

  logout() {
    this.userservice.logout();
  }

}
