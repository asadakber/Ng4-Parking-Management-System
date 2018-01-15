import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookparkingComponent } from './bookparking.component';

describe('BookparkingComponent', () => {
  let component: BookparkingComponent;
  let fixture: ComponentFixture<BookparkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookparkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookparkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
