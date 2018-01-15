import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SlotReservationService } from '../slot-reservation.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-bookparking',
  templateUrl: './bookparking.component.html',
  styleUrls: ['./bookparking.component.css']
})
export class BookparkingComponent implements OnInit {

  show = false;
  show1 = false;
  show2 = false; 
  canttstationForm: FormGroup;
  JinnahInternationalAirportForm: FormGroup;
  ThePalaceMallForm: FormGroup;
    year;
    minDate = new Date();
    showcanttstation = true;
    JinnahInternationalAirport = true;
    Thepalacemall = true;
    currentBookingKey;
    allUsersSelectedDate;
    allUsersTimeDuration;
    allUsersStartTime;
    allUsersEndTime;
    currentNode;
    userUid;
    allUserstimeDateAndSlotArray = [];
    userBookingArray = [];
    date;
    initializeTime;
    reservedHours;
    totalBookingHours;
    TimeDuration;
    slot;
    slotNumber;
    slotN;
    slotNm;
    allSlots;
      items: FirebaseListObservable<any>;
    sendUserBookingData: FirebaseListObservable<any>;
    fetchAllUsers: FirebaseObjectObservable<any>;
    fetchBooking: FirebaseListObservable<any>;
    fetchBookingForCancel: FirebaseListObservable<any>;
  
    times = [
      { value: '9:00', viewValue: '9:00' },
      { value: '10:00', viewValue: '10:00' },
      { value: '11:00', viewValue: '11:00' },
      { value: '12:00', viewValue: '12:00' },
      { value: '13:00', viewValue: '13:00' },
      { value: '14:00', viewValue: '14:00' },
      { value: '15:00', viewValue: '15:00' },
      { value: '16:00', viewValue: '16:00' },
      { value: '17:00', viewValue: '17:00' },
      { value: '18:00', viewValue: '18:00' },
      { value: '19:00', viewValue: '19:00' },
      { value: '20:00', viewValue: '20:00' },
      { value: '21:00', viewValue: '21:00' }
    ];
  
    reserved_hours = [
      { value: '1-hour', viewValue: '1 hour' },
      { value: '2-hours', viewValue: '2 hours' },
      { value: '3-hours', viewValue: '3 hours' },
      { value: '4-hours', viewValue: '4 hours' },
      { value: '5-hours', viewValue: '5 hours' },
      { value: '6-hours', viewValue: '6 hours' },
      { value: '7-hours', viewValue: '7 hours' }
    ];
  
    buttons = [
      { reserved: false, slotNumber: 1 },
      { reserved: false, slotNumber: 2 },
      { reserved: false, slotNumber: 3 },
      { reserved: false, slotNumber: 4 },
      { reserved: false, slotNumber: 5 },
      { reserved: false, slotNumber: 6 },
      { reserved: false, slotNumber: 7 },
      { reserved: false, slotNumber: 8 },
      { reserved: false, slotNumber: 9 },
      { reserved: false, slotNumber: 10 },
  
    ];
  
    Buttons = [
      { reserve: false, slotN: 1 },
      { reserve: false, slotN: 2 },
      { reserve: false, slotN: 3 },
      { reserve: false, slotN: 4 },
      { reserve: false, slotN: 5 },
      { reserve: false, slotN: 6 },
      { reserve: false, slotN: 7 },
      { reserve: false, slotN: 8 },
      { reserve: false, slotN: 9 },
      { reserve: false, slotN: 10 },
    ];
  
    BUTTONS = [
      { res: false, slotNm: 1 },
      { res: false, slotNm: 2 },
      { res: false, slotNm: 3 },
      { res: false, slotNm: 4 },
      { res: false, slotNm: 5 },
      { res: false, slotNm: 6 },
      { res: false, slotNm: 7 },
      { res: false, slotNm: 8 },
      { res: false, slotNm: 9 },
      { res: false, slotNm: 10 },
    ]
    newvalue;
  constructor(private afauth: AngularFireAuth,private fb: FormBuilder,public db: AngularFireDatabase, private route: ActivatedRoute, public userservice: UserService, private router: Router, private slotreservationservice: SlotReservationService) {
     this.canttstationForm = this.fb.group({
			timeOptions: '',
			reservedHoursOptions: '',
			dateOptions: '',
		});
	
	this.JinnahInternationalAirportForm = this.fb.group({
		TIME: '',
		HOURS: '',
		DATE: ''
	});

	this.ThePalaceMallForm = this.fb.group({
		TIMES: '',
		RESHOURS: '',
		DATES: ''
	})
	 
  }


  ngOnInit() {


  }

  bookSlot() {
    for (var i = 0; i < this.BUTTONS.length; i++) {
      this.BUTTONS[i].res = false;
    }
    this.date = this.ThePalaceMallForm.value.DATES.toString();
    this.date = this.date.slice(4, 15);
    this.initializeTime = parseInt(this.ThePalaceMallForm.value.TIMES);
    this.reservedHours = parseInt(this.ThePalaceMallForm.value.RESHOURS);
    this.totalBookingHours = this.initializeTime + this.reservedHours;
    this.TimeDuration = this.initializeTime + " to " + this.totalBookingHours;
    this.fetchAllUsers = this.db.object('/The-Palace-Mall', { preserveSnapshot: true });
    this.fetchAllUsers.subscribe(snapshots => {
      snapshots.forEach(element => {
        element.forEach(snapshot => {
          if (this.date == snapshot.val().selectedDate) {
  
            if (this.initializeTime == snapshot.val().startTime) {
  
              this.BUTTONS[(snapshot.val().slot - 1)].res = true;
            }
            else if (this.initializeTime != snapshot.val().startTime) {
  
              if ((snapshot.val().startTime > this.initializeTime && this.totalBookingHours > snapshot.val().startTime) || (this.initializeTime > snapshot.val().startTime && this.initializeTime < snapshot.val().endTime)) {
  
                this.BUTTONS[(snapshot.val().slot - 1)].res = true;
              }
            }
  
          }
        });
      });
      this.Thepalacemall = false;
      this.allSlots = true;
    })
  
  }
  
  
  istimes = false;
  isreservedhour = false;
  issubmitbuttons = false;
    
  ondatechanges(event: Event) {
    
    
    
    
        this.istimes = true;
      }
      ontimechanges(event: Event) {
        this.isreservedhour = true;
    
      }
    
      onreservedhrschanges(event: Event) {
        this.issubmitbuttons = true;
      }
    
    
      BACK() {
    
        this.allSlots = false;
        this.Thepalacemall = true;
      }
  
      objects: {
        date: '',
        slotNum: '',
      timeDuration: '',
      duration: ''
      }
  
      resslots(slotNm) {
        this.objects = { date: '', slotNum: '', timeDuration: '', duration: ''  };
        this.slotNm = slotNm
    
        this.date = this.ThePalaceMallForm.value.DATES.toString();
        this.date = this.date.slice(4, 15);
        this.initializeTime = parseInt(this.ThePalaceMallForm.value.TIMES);
        this.reservedHours = parseInt(this.ThePalaceMallForm.value.RESHOURS);
        this.totalBookingHours = this.initializeTime + this.reservedHours;
    
        this.TimeDuration = this.initializeTime + ":00 " + " to " + this.totalBookingHours + ":00 ";
        this.currentNode = 'The-Palace-Mall';
        this.userUid = this.afauth.auth.currentUser.uid;
    
        this.sendUserBookingData = this.db.list('The-Palace-Mall' +  "/" + this.afauth.auth.currentUser.uid);
        this.sendUserBookingData.push({
          slotBook: false, place: 'The-Palace-Mall', uid: this.afauth.auth.currentUser.uid, selectedDate: this.date, Duration: this.reservedHours,
          startTime: this.initializeTime, endTime: this.totalBookingHours, timeDuration: this.TimeDuration, slot: slotNm
        })
    
        this.Thepalacemall = false;
    
        this.objects.date = this.date;
        this.objects.slotNum = slotNm;
        this.objects.timeDuration = this.TimeDuration;
        this.objects.duration = this.reservedHours;
         
        
        this.userBookingArray.push(this.objects);
      
    
        this.Booking(this.date, this.TimeDuration);
        this.allSlots = false;
        this.router.navigate(['/user/viewbooking'])
      }
  
      Booking(date, timeDuration) {
        
        
            this.fetchBooking = this.db.list('The-Palace-Mall/' + this.afauth.auth.currentUser.uid, { preserveSnapshot: true });
            this.fetchBooking
              .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
        
                  if (snapshot.val().selectedDate == date && snapshot.val().timeDuration == timeDuration) {
          
                    this.currentBookingKey = snapshot.key
          
                  }
                });
              });
        
        
          }
  
   
     showSlot() {
    for (var i = 0; i < this.Buttons.length; i++) {
      this.Buttons[i].reserve = false;
    }
    this.date = this.JinnahInternationalAirportForm.value.DATE.toString();
    this.date = this.date.slice(4, 15);
    this.initializeTime = parseInt(this.JinnahInternationalAirportForm.value.TIME);
    this.reservedHours = parseInt(this.JinnahInternationalAirportForm.value.HOURS);
    this.totalBookingHours = this.initializeTime + this.reservedHours;
    this.TimeDuration = this.initializeTime + " to " + this.totalBookingHours;
    this.fetchAllUsers = this.db.object('/Jinnah-International-Airport', { preserveSnapshot: true });
    this.fetchAllUsers.subscribe(snapshots => {
      snapshots.forEach(element => {
        element.forEach(snapshot => {
          if (this.date == snapshot.val().selectedDate) {
  
            if (this.initializeTime == snapshot.val().startTime) {
  
              this.Buttons[(snapshot.val().slot - 1)].reserve = true;
            }
            else if (this.initializeTime != snapshot.val().startTime) {
  
              if ((snapshot.val().startTime > this.initializeTime && this.totalBookingHours > snapshot.val().startTime) || (this.initializeTime > snapshot.val().startTime && this.initializeTime < snapshot.val().endTime)) {
  
                this.Buttons[(snapshot.val().slot - 1)].reserve = true;
              }
            }
  
          }
        });
      });
      this.JinnahInternationalAirport = false;
      this.allSlots = true;
    })
  
  }
  
  
  istime = false;
  isreservedhours = false;
  issubmitbutton = false;
  
  ondatechange(event: Event) {
    
    
    
    
        this.istime = true;
      }
      ontimechange(event: Event) {
        this.isreservedhours = true;
    
      }
    
      onreservedhrschange(event: Event) {
        this.issubmitbutton = true;
      }
    
    
      Back() {
    
        this.allSlots = false;
        this.JinnahInternationalAirport = true;
      }
  
      object: {
        date: '',
        slotNum: '',
      timeDuration: '',
      duration: ''
    
    
      }
  
      reserveslot(slotN) {
        this.object = { date: '', slotNum: '', timeDuration: '', duration: ''  };
        this.slotN = slotN
    
        this.date = this.JinnahInternationalAirportForm.value.DATE.toString();
        this.date = this.date.slice(4, 15);
        this.initializeTime = parseInt(this.JinnahInternationalAirportForm.value.TIME);
        this.reservedHours = parseInt(this.JinnahInternationalAirportForm.value.HOURS);
        this.totalBookingHours = this.initializeTime + this.reservedHours;
    
        this.TimeDuration = this.initializeTime + ":00 " + " to " + this.totalBookingHours + ":00 ";
        this.currentNode = 'Jinnah-International-Airport';
        this.userUid = this.afauth.auth.currentUser.uid;
    
        this.sendUserBookingData = this.db.list('Jinnah-International-Airport' +  "/" + this.afauth.auth.currentUser.uid);
        this.sendUserBookingData.push({
          slotBook: false, place: 'Jinnah-International-Airport', uid: this.afauth.auth.currentUser.uid, selectedDate: this.date, Duration: this.reservedHours,
          startTime: this.initializeTime, endTime: this.totalBookingHours, timeDuration: this.TimeDuration, slot: slotN
        })
    
        this.JinnahInternationalAirport = false;
    
        this.object.date = this.date;
        this.object.slotNum = slotN;
        this.object.timeDuration = this.TimeDuration;
        this.object.duration = this.reservedHours;
         
        
        this.userBookingArray.push(this.object);
      
    
        this.CurrentBooking(this.date, this.TimeDuration);
        this.allSlots = false;
        this.router.navigate(['/user/viewbooking'])
      }
  
      CurrentBooking(date, timeDuration) {
        
        
            this.fetchBooking = this.db.list('Jinnah-International-Airport/' + this.afauth.auth.currentUser.uid, { preserveSnapshot: true });
            this.fetchBooking
              .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
        
                  if (snapshot.val().selectedDate == date && snapshot.val().timeDuration == timeDuration) {
          
                    this.currentBookingKey = snapshot.key
          
                  }
                });
              });
        
        
          }
     
   
    submit() {
      for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].reserved = false;
      }
      this.date = this.canttstationForm.value.dateOptions.toString();
      this.date = this.date.slice(4, 15);
      this.initializeTime = parseInt(this.canttstationForm.value.timeOptions);
      this.reservedHours = parseInt(this.canttstationForm.value.reservedHoursOptions);
      this.totalBookingHours = this.initializeTime + this.reservedHours;
      this.TimeDuration = this.initializeTime + " to " + this.totalBookingHours;
      this.fetchAllUsers = this.db.object('/cantt-station/', { preserveSnapshot: true });
      this.fetchAllUsers.subscribe(snapshots => {
        snapshots.forEach(element => {
          element.forEach(snapshot => {
            if (this.date == snapshot.val().selectedDate) {
  
              if (this.initializeTime == snapshot.val().startTime) {
  
                this.buttons[(snapshot.val().slot - 1)].reserved = true;
              }
              else if (this.initializeTime != snapshot.val().startTime) {
  
                if ((snapshot.val().startTime > this.initializeTime && this.totalBookingHours > snapshot.val().startTime) || (this.initializeTime > snapshot.val().startTime && this.initializeTime < snapshot.val().endTime)) {
  
                  this.buttons[(snapshot.val().slot - 1)].reserved = true;
                }
              }
  
            }
          });
        });
        this.showcanttstation = false;
        this.allSlots = true;
      })
  
    }
  
    
    isTime = false;
    isReservedHours = false;
    isSubmitButton = false;
  
  
  
  
  
    
  
    onDateChange(event: Event) {
  
  
  
  
      this.isTime = true;
    }
    onTimeChange(event: Event) {
      this.isReservedHours = true;
  
    }
  
    onReservedHrsChange(event: Event) {
      this.isSubmitButton = true;
    }
  
  
    back() {
  
      this.allSlots = false;
      this.showcanttstation = true;
    }
    
  
    obj: {
      date: '',
      slotNum: '',
    timeDuration: '',
    duration: ''
  
  
    }
  
    slots(slotNumber) {
      
      this.obj = { date: '', slotNum: '', timeDuration: '', duration: ''  };
      this.slotNumber = slotNumber
  
      this.date = this.canttstationForm.value.dateOptions.toString();
      this.date = this.date.slice(4, 15);
      this.initializeTime = parseInt(this.canttstationForm.value.timeOptions);
      this.reservedHours = parseInt(this.canttstationForm.value.reservedHoursOptions);
      this.totalBookingHours = this.initializeTime + this.reservedHours;
  
      this.TimeDuration = this.initializeTime + ":00 " + " to " + this.totalBookingHours + ":00 ";
      this.currentNode = 'cantt-station';
      this.userUid = this.afauth.auth.currentUser.uid;
  
      this.sendUserBookingData = this.db.list('/cantt-station/' +  "/" + this.afauth.auth.currentUser.uid);
      this.sendUserBookingData.push({
        slotBook: false, place: 'cantt-station', uid: this.afauth.auth.currentUser.uid, selectedDate: this.date, Duration: this.reservedHours,
        startTime: this.initializeTime, endTime: this.totalBookingHours, timeDuration: this.TimeDuration, slot: slotNumber
      })
  
      this.showcanttstation = false;
  
      this.obj.date = this.date;
      this.obj.slotNum = slotNumber;
      this.obj.timeDuration = this.TimeDuration;
      this.obj.duration = this.reservedHours;
       
      
      this.userBookingArray.push(this.obj);
    
  
      this.getCurrentBooking(this.date, this.TimeDuration);
      this.allSlots = false;
      this.router.navigate(['/user/viewbooking'])
  
    }
  
    getCurrentBooking(date, timeDuration) {
  
  
      this.fetchBooking = this.db.list('/cantt-station/' + this.afauth.auth.currentUser.uid, { preserveSnapshot: true });
      this.fetchBooking
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
  
            if (snapshot.val().selectedDate == date && snapshot.val().timeDuration == timeDuration) {
    
              this.currentBookingKey = snapshot.key
    
            }
          });
        });
  
  
    }
  
    Show() {
      this.show = !this.show;
    }
  
    Show1(){
     this.show1 = !this.show1;
    }
  
    Show2() {
     this.show2 = !this.show2;
    }
  
    logout() {
      this.userservice.logout();
    }
 



}
