import { OnInit, Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { ItemFilterPage } from '../item-filter/item-filter';

import { JkkData } from './../../providers/jkk-data';

import * as jQuery from "jquery";
import * as quickblox from "quickblox";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  segment = 'all';
  excludeTracks: any = [];

	// the array of items found
	items

	// the update time
	updated_at

	constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private jkkData: JkkData
  ) {
		//console.log("HomePage constructor");
		// the array of items found
		this.items = [];

    // the update time
    this.updated_at = "";

    console.log(quickblox.init());
    //quickblox.init(53312, 'PD4TYw95-SjzQBC', 'jaO2aB8xw7PbZJz');
  }

	// init
	ngOnInit() {
		//console.log("HomePage ngOnInit start");
		this.jkkData.getData().subscribe(
			(response) => {
				// process the results..
				// console.log('search results', response.data);
				this.items = response.data.list
				this.updated_at = response.data.updated_at
			}, (error) => {
				// handle an error condition...
				console.log("Error Searching: " + error)
			}, () => {
				// called when completely done processing
				console.log("All Good With The Data");
			}
		);
		//console.log("HomePage ngOnInit end");
	}

	doRefresh(refresher) {
		console.log('Begin async operation', refresher);
		this.jkkData.getData().subscribe(
			(response) => {
				// process the results..
				console.log('search results', response.data);
				this.items = response.data.list
				this.updated_at = response.data.updated_at
			}, (error) => {
				// handle an error condition...
				console.log("Error Searching: " + error)
			}, () => {
				// called when completely done processing
				console.log("All Good With The Data");
			}
		);
		setTimeout(() => {
			console.log('Async operation has ended');
			refresher.complete();
		}, 2000);
	}

  updateSchedule() {
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ItemFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      console.log(data);
      if (data) {
        this.excludeTracks = data;
        //this.updateSchedule();
      }
    });

  }
}
