import { Component } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent {
  notifications: string[] = [];

  constructor(private notificationService: NotificationService) {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.notificationService.notifications$.subscribe((message) => {
      this.notifications.push(message);
      setTimeout(() => {
        this.removeNotification(this.notifications.length - 1);
      }, 5000);
    });
  }

  removeNotification(index: number) {
    this.notifications.splice(index, 1);
  }
}
