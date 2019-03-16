import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotificationFormComponent } from './send-notification-form.component';

describe('SendNotificationFormComponent', () => {
  let component: SendNotificationFormComponent;
  let fixture: ComponentFixture<SendNotificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendNotificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNotificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
