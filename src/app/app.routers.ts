import { SignInComponent } from './sign-in/sign-in.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ParkingDashboardComponent } from './parking-dashboard/parking-dashboard.component';
import { BookparkingComponent } from './bookparking/bookparking.component';
import { ViewbookingComponent } from './viewbooking/viewbooking.component';
import { ChatComponent } from './chat/chat.component';
import { AdminparkingdashboardComponent } from './adminparkingdashboard/adminparkingdashboard.component';
import { AllviewbookingComponent } from './allviewbooking/allviewbooking.component';
import { AllviewusersComponent } from './allviewusers/allviewusers.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserGuard } from "./user.guard";
import { AdminGuard } from "./admin.guard";
import { UserprofileComponent } from './userprofile/userprofile.component';
export const router: Routes = [

    { path:'', canActivate: [UserGuard,AdminGuard], component:SignInComponent },
    // { path: '', redirectTo: 'signin', pathMatch: 'full', },
    { path: 'signin', component:SignInComponent },
    { path: 'signup', component:SignUpComponent },
    
    {
    path: 'user', canActivate: [UserGuard], component: ParkingDashboardComponent, children: [
        { path: 'bookparking', component:BookparkingComponent },
        { path: 'viewbooking',component:ViewbookingComponent },
        { path: 'livechat', component:ChatComponent },
        { path: 'userprofile', component:UserprofileComponent}
    ]
        
    },

    {
        path: 'admin', canActivate: [AdminGuard], component: AdminparkingdashboardComponent, children: [
            { path: 'allviewbooking', component:AllviewbookingComponent },
            { path: 'allviewusers',component:AllviewusersComponent },
            { path: 'feedback', component:FeedbackComponent }
        ]
        
    },

    { path: '**', redirectTo: '' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
