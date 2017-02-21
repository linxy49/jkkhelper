import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Device, Splashscreen, StatusBar } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { QuickBlox } from '../providers/quickblox';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage = TabsPage;
	// private QB;
	constructor(
		public platform: Platform,
		private quickblox: QuickBlox
	) {
		platform.ready().then(() => {
			StatusBar.styleDefault();
			Splashscreen.hide();
			if (platform.is('ios')) {console.log(Device.uuid)}
			quickblox.init('9999');
		});
	}
}
