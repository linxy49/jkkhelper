import { OnInit, Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ItemFilterPage } from '../item-filter/item-filter';
import { Device, Vibration } from 'ionic-native';
import { Notifications } from './../../providers/notifications';
import { QuickBlox } from './../../providers/quickblox';
import { JkkData } from './../../providers/jkk-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  segment = 'recent';
  excludeTracks: any = [];
  items;
  updated_at;
  connected;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
	private quickblox: QuickBlox,
	private notifications: Notifications,
    private jkkData: JkkData
  ) {

    this.events.subscribe('quickblox:connected', () => {
		  this.connected = true;
    });

    this.items = [];
    this.updated_at = "";
	  this.connected = false;
  }

  // init
  ngOnInit() {
     this.jkkData.getData().subscribe(
       (response) => {
         this.items = response.data.list;
         this.updated_at = response.data.updated_at;
       }, (error) => {
         console.log("Error Searching: " + error);
       }, () => {
         console.log("All Good With The Data");
       }
     );
  }

  doRefresh(refresher) {
     this.jkkData.getData().subscribe(
       (response) => {
         console.log('search results', response.data);
         this.items = response.data.list
         this.updated_at = response.data.updated_at
       }, (error) => {
         console.log("Error Searching: " + error);
       }, () => {
         console.log("All Good With The Data");
       }
     );
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  updateSchedule() {
	  this.quickblox.init('8D5B835A-D5E6-498E-8036-3285D8435EAF', this.events, this.notifications);
  }

  presentFilter() {
	this.quickblox.sendSystemMessage();	  
    //  let modal = this.modalCtrl.create(ItemFilterPage, this.excludeTracks);
    //  modal.present();
    //  modal.onWillDismiss((data: any[]) => {
    //    console.log(data);
    //    if (data) {
    //      this.excludeTracks = data;
    //    }
    //  });
  }
}
