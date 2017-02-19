import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	rootPage = TabsPage;
	constructor(platform: Platform) {
		platform.ready().then(() => {
			StatusBar.styleDefault();
			Splashscreen.hide();

//			if (platform.is('ios')) {
//	    }

		});
	}
}
