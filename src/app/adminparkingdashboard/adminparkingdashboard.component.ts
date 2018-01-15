import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: 'app-adminparkingdashboard',
  templateUrl: './adminparkingdashboard.component.html',
  styleUrls: ['./adminparkingdashboard.component.css']
})
export class AdminparkingdashboardComponent implements OnInit {

  constructor(public userservice: UserService,public fb:FormBuilder,public db:AngularFireDatabase) { }
  form:FormGroup;
  ngOnInit() {
    // this.form = this.fb.group({
    //   locationName: ['', Validators.required],
    //   totalSlots: ['', Validators.required],
    //   slots: ['', Validators.required]
    // });
  }

  logout() {
    this.userservice.logout();
  }
// slots=[]
//   addLocations() {
//     let u = this.form.value
//     this.slots = [];
//     for (var a = 0; a < u.totalSlots; a++) {
//       this.slots.push(a + 1);
//     }
//     u.slots = this.slots;
//     console.log(this.form.value);
//     this.db.list('/locations').push(this.form.value);
//   }

}
