import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
@Injectable()
export class ChatserviceService {

  constructor(private afauth: AngularFireAuth ,private db:AngularFireDatabase, private userservice: UserService) {
 
  }
 
  sendReply(currrentPersonUid, message) {
    this.db.list('feedback/' + currrentPersonUid).push(message)

  }

  
}
