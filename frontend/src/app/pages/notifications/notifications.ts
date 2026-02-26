import { Component, OnInit } from '@angular/core';
import { NotificationsServices } from '../../services/notif/notifications-services';
import { NotificationModel } from '../../models/notification';
import { CommonModule, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit{
  notifications: NotificationModel[] = [];
  shopId = '698b04d85bfcbccb80e5e06a'; // récupérer depuis auth ou route

  constructor(private notificationService: NotificationsServices) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService
      .getShopNotifications(this.shopId)
      .subscribe(data => {
        this.notifications = data;
      });
  }

  markAsRead(notification: NotificationModel) {
    this.notificationService
      .markAsRead(notification._id)
      .subscribe(() => {
        notification.read = true;
      });
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
}
