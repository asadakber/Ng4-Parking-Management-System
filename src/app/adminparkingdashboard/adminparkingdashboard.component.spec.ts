import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminparkingdashboardComponent } from './adminparkingdashboard.component';

describe('AdminparkingdashboardComponent', () => {
  let component: AdminparkingdashboardComponent;
  let fixture: ComponentFixture<AdminparkingdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminparkingdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminparkingdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
