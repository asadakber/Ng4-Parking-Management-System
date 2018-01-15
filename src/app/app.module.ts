import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MaterialModule } from '@angular/material';
import { routes } from './app.routers';
import { AngularFireModule } from 'angularfire2';
import { MdMenuModule ,MdSidenavModule, MdListModule ,MdTabsModule, MdDatepickerModule,MdNativeDateModule, MdSelectModule, MdButtonToggleModule, MdDialogModule, MdCardModule, MdButtonModule, MdInputModule ,MdRadioModule} from '@angular/material';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { ParkingDashboardComponent } from './parking-dashboard/parking-dashboard.component';
import { BookparkingComponent } from './bookparking/bookparking.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SlotReservationService } from './slot-reservation.service';
import { UserService } from './user.service';
import 'hammerjs';
import { ViewbookingComponent } from './viewbooking/viewbooking.component';
import { ChatComponent } from './chat/chat.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ChatserviceService } from './chatservice.service';
import { AdminparkingdashboardComponent } from './adminparkingdashboard/adminparkingdashboard.component';
import { AllviewbookingComponent } from './allviewbooking/allviewbooking.component';
import { AllviewusersComponent } from './allviewusers/allviewusers.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserGuard } from "./user.guard";
import { AdminGuard } from "./admin.guard";
import { UserprofileComponent } from './userprofile/userprofile.component';

declare var require: any;
declare var module: any;

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ParkingDashboardComponent,
    BookparkingComponent,
    ViewbookingComponent,
    ChatComponent,
    AdminparkingdashboardComponent,
    AllviewbookingComponent,
    AllviewusersComponent,
    FeedbackComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    routes,
    FormsModule,
    ReactiveFormsModule,
    MdDialogModule,
    MdButtonToggleModule,
    MdDatepickerModule,
    AngularFireAuthModule,
    MdNativeDateModule,
    MdSelectModule,
    MdTabsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    MdListModule,
    MdSidenavModule,
    MdMenuModule,
    MdRadioModule
  ],
  providers: [UserGuard,AdminGuard,UserService,ChatserviceService,SlotReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
