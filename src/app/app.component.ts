import { Component } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { Device, LocalNotifications, Splashscreen, StatusBar } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { QuickBlox } from '../providers/quickblox';
import { Notifications } from '../providers/notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  constructor(
    public events: Events,
    public platform: Platform,
    private quickblox: QuickBlox,
    private notifications: Notifications
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      quickblox.init('8D5B835A-D5E6-498E-8036-3285D8435EAF', events, notifications);
    });

    events.subscribe('quickblox:connected', () => {
      quickblox.setConnectStatus();
    });

    LocalNotifications.on("click", (notification, state) => {
      notifications.show(notification);
    });
  }
}
