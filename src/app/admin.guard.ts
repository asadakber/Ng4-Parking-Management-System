import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()

export class AdminGuard implements CanActivate {
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}
  canActivate() {
    return this.firebaseAuth.authState.map(user => {
      if(user == null) {
        this.router.navigate(['signin']);
        return false;
      }
      else if (user != null && user.email == 'admin@admin.com') {
        return true;
      }

      else {
        this.router.navigate(['user'])
      }
    })
    
  }
}
