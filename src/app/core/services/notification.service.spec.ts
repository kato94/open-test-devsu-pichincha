import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Must return notification', () => {
    let res: string | undefined;
    const message = 'Test notification';

    service.notifications$.subscribe((value) => {
      res = value;
    });

    service.addNotification(message);

    expect(res).toEqual(message);
  });
});
