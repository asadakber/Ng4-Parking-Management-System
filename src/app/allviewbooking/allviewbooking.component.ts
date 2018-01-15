import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
@Component({
  selector: 'app-allviewbooking',
  templateUrl: './allviewbooking.component.html',
  styleUrls: ['./allviewbooking.component.css']
})
export class AllviewbookingComponent implements OnInit {
  viewprofile: FirebaseListObservable<any>;
  profile: FirebaseListObservable<any>;
  bookview:FirebaseListObservable<any>;
  Book = [];
  bookkey = [];
  table = [];
  key = [];
  tablekey = []; 
  arr = []
  constructor(private db: AngularFireDatabase,private afauth: AngularFireAuth,public userservice: UserService) { 
    this.bookView();
    this.book();
    this.viewbook();
  }

  ngOnInit() {
  }

  bookView(){
    this.viewprofile = this.db.list('/cantt-station/', {preserveSnapshot: true})
    this.viewprofile.subscribe(user =>{
      this.arr.length=  0;
    user.forEach(element => { 
      element.forEach(val => {
    this.arr.push(val.val()) ;
    this.tablekey.push(element.key) ;

});
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
    this.table.push(val.val()) ;
    this.key.push(element.key) ;

});
    })
})
  }

  viewbook() {
    this.bookview = this.db.list('/The-Palace-Mall/', {preserveSnapshot: true})
    this.bookview.subscribe(user =>{
      this.Book.length=  0;
    user.forEach(element => { 
      element.forEach(val => {
    this.Book.push(val.val()) ;
    this.bookkey.push(element.key) ;

});
    })
})
  }

  cancel(i) {
    const  key = this.tablekey[i]
    this.db.list('/cantt-station/' + key, {preserveSnapshot:true}).remove()
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
