import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllviewusersComponent } from './allviewusers.component';

describe('AllviewusersComponent', () => {
  let component: AllviewusersComponent;
  let fixture: ComponentFixture<AllviewusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllviewusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllviewusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
