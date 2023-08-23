import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new Subject<string>();
  notifications$ = this.notificationsSubject.asObservable();

  addNotification(message: string) {
    this.notificationsSubject.next(message);
  }
}
