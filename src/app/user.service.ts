import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Observer } from "rxjs/Observer";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
@Injectable()
export class UserService {

  error: any;
  userRegistration: FirebaseObjectObservable<any>;
  allUsers: FirebaseListObservable<any>;
  allUsersKey = [];
  allUsersVal = [];
  authState;
  userProfile;
  userType;
  Uid;
  deletebooking: FirebaseListObservable<any>;
  profile: FirebaseListObservable<any>;
  constructor(private db: AngularFireDatabase,private firebaseAuth: AngularFireAuth, private router: Router) {
     this.firebaseAuth.authState.subscribe((auth)=>{
      console.log(this.authState);
      console.log("Auth Changes");
     })
  
   }

   showUser() {
     this.Uid = this.firebaseAuth.auth.currentUser.uid;
     this.profile = this.db.list('/users/' +  this.Uid, {preserveSnapshot:true});
     this.profile.subscribe(Snapshot => {
       Snapshot.forEach(Snapshot => {
         if(Snapshot.val().type == 'user') {
           this.router.navigate(['/parkingdashboard'])
         }
         else if(Snapshot.val().type == 'admin') {
          this.router.navigate(['/adminparkingdashboard'])
         }
         else {
          this.router.navigate(['/signup'])
         }
       })
     })
   }

   signup(name: string, email: string, password: string, contactno: string, address: string, type: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((data)=>{
       this.Uid = this.firebaseAuth.auth.currentUser.uid;
       let formdata = {name,email,password,contactno,address, type}
       this.db.list('/users/' + this.Uid).push(formdata)
     this.router.navigate(['/signin'])
     }).catch(error => {
       this.error = error;
     })
   }

   signin(email: string, password: string) {
     return this.firebaseAuth.auth.signInWithEmailAndPassword(email,password)
     .then((data)=> {
       this.router.navigate(['/parkingdashboard'])
      this.showUser();
     }) .catch((error)=> {
       this.error = error;
     })
   }

	 get UserProfile(): Observable<any> {
    console.log("getUserProfile");
    console.log(this.firebaseAuth.auth.currentUser.uid);
    this.userRegistration = this.db.object('/users/' + this.firebaseAuth.auth.currentUser.uid, { preserveSnapshot: true });
    return this.userRegistration.map((data) => {
		console.log(data);
     this.userProfile = data.val();
      console.log(this.userProfile);
      return this.userProfile;
    })

  }

	get authenticated(): boolean {
		return this.authState !== null;
	}

	// Returns current user data
	get currentUser(): any {
		return this.authenticated ? this.authState : null;
	}

	// Returns
	get currentUserObservable(): any {
		return this.firebaseAuth.authState
	}

	// Returns current user UID
	get currentUserId(): string {
		return this.authenticated ? this.authState.uid : '';
	}

  get AllUsers(): Observable<any> {
    
        this.allUsers = this.db.list('/users/', { preserveSnapshot: true })
        return this.allUsers.map((uidies) => {
          this.allUsersKey = [];
          this.allUsersVal = [];
          uidies.forEach(data => {
            this.allUsersKey.push(data.key);
            this.allUsersVal.push(data.val());
          });
          return this.allUsersVal;
        })
      }
    
      get getAllUsersKey(): any {
        return this.allUsersKey;
      }

     


  logout() {
    this.firebaseAuth.auth.signOut();
    this.router.navigateByUrl('/signin')
  }
}
