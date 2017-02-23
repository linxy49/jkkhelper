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
	private quickblox: QuickBlox,
    private notifications: Notifications,
    public platform: Platform
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
	  if (this.platform.is('ios') || this.platform.is('android')) {
	  	this.quickblox.setUuid(Device.uuid);
	  }
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
