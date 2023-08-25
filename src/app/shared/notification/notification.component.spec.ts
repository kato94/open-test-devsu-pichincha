import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { of } from 'rxjs';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent]
    });

    notificationService = TestBed.inject(NotificationService);
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', fakeAsync(() => {
    const message = 'Test notification';

    notificationService.notifications$ = of(message);

    component.subscribeToNotifications();

    expect(component.notifications).toEqual([message]);

    tick(5000);
    expect(component.notifications).toEqual([]);
  }));

  it('Should remove notification', () => {
    component.notifications = ['Notification 1', 'Notification 2', 'Notification 3'];

    component.removeNotification(1);

    expect(component.notifications).toEqual(['Notification 1', 'Notification 3']);
  });
});
