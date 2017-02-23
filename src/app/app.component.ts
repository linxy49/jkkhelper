import { Component } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { LocalNotifications, Splashscreen, StatusBar } from 'ionic-native';
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
	private quickblox: QuickBlox,
    private notifications: Notifications,
    public platform: Platform
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.quickblox.init('8D5B835A-D5E6-498E-8036-3285D8435EAF', this.events, this.notifications);
    });

    events.subscribe('quickblox:connected', () => {
      this.quickblox.setConnectStatus(true);
    });

	events.subscribe('quickblox:disconnected', () => {
      this.quickblox.setConnectStatus(false);
    });

    LocalNotifications.on("click", (notification, state) => {
      this.notifications.show(notification);
    });
  }
}
