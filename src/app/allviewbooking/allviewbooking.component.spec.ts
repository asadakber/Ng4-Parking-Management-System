import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllviewbookingComponent } from './allviewbooking.component';

describe('AllviewbookingComponent', () => {
  let component: AllviewbookingComponent;
  let fixture: ComponentFixture<AllviewbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllviewbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllviewbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
