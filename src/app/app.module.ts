import { NgModule, ErrorHandler  } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ItemFilterPage } from '../pages/item-filter/item-filter';

import { JkkData } from '../providers/jkk-data';
import { QuickBlox } from '../providers/quickblox';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ItemFilterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ItemFilterPage
  ],
  providers: [
	  { provide: ErrorHandler, useClass: IonicErrorHandler },
	  JkkData,
	  QuickBlox
  ]
})
export class AppModule {}
