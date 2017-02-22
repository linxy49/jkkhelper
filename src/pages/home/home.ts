import { OnInit, Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ItemFilterPage } from '../item-filter/item-filter';
import { Vibration } from 'ionic-native';

import { JkkData } from './../../providers/jkk-data';
import { QuickBlox } from './../../providers/quickblox';

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
    private jkkData: JkkData,
	private quickblox: QuickBlox
  ) {

    this.events.subscribe('quickblox:connected', () => {
		console.log("quickblox:connected");
		this.connected = true;
    });

    this.items = [];
    this.updated_at = "";
	this.connected = false;
  }

  // init
  ngOnInit() {
    // this.jkkData.getData().subscribe(
    //   (response) => {
    //     this.items = response.data.list
    //     this.updated_at = response.data.updated_at
    //   }, (error) => {
    //     console.log("Error Searching: " + error)
    //   }, () => {
    //     console.log("All Good With The Data");
    //   }
    // );
  }

  doRefresh(refresher) {
	  this.quickblox.sendSystemMessage();
    // this.jkkData.getData().subscribe(
    //   (response) => {
    //     console.log('search results', response.data);
    //     this.items = response.data.list
    //     this.updated_at = response.data.updated_at
    //   }, (error) => {
    //     console.log("Error Searching: " + error)
    //   }, () => {
    //     console.log("All Good With The Data");
    //   }
    // );
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  updateSchedule() {
	  alert(1);
	  Vibration.vibrate([3000,1000,3000]);
	  alert(2);
  }

  presentFilter() {
	  alert(3);
	  Vibration.vibrate(0);
	  alert(4);
    // let modal = this.modalCtrl.create(ItemFilterPage, this.excludeTracks);
    // modal.present();
	//
    // modal.onWillDismiss((data: any[]) => {
    //   console.log(data);
    //   if (data) {
    //     this.excludeTracks = data;
    //   }
    // });
  }
}
