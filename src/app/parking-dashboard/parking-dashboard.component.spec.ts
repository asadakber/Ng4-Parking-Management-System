import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingDashboardComponent } from './parking-dashboard.component';

describe('ParkingDashboardComponent', () => {
  let component: ParkingDashboardComponent;
  let fixture: ComponentFixture<ParkingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
