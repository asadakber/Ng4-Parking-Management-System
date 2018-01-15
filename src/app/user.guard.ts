import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userservice: UserService,private router:Router, private firebaseAuth: AngularFireAuth){}
  canActivate() {
    return this.firebaseAuth.authState.map(user => {
      if(user == null) {
        this.router.navigate(['/signin']);
        return false;
      }

      else if (user != null && user.email != 'admin@admin.com') {
        return true;
      }

      else {
        this.router.navigate(['admin'])
        return true;
      }
    }).take(1)
  }
}
