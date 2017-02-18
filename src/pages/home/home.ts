import { OnInit, Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { ItemFilterPage } from '../item-filter/item-filter';
import { ContactPage } from '../contact/contact';

import { JkkData } from './../../providers/jkk-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  segment = 'all';

	// the array of items found
	items

	// the update time
	updated_at

	constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private jkkData: JkkData
  ) {
		console.log("HomePage constructor");
		// the array of items found
		this.items = [];

    // the update time
    this.updated_at = ""
  }

	// init
	ngOnInit() {
		console.log("HomePage ngOnInit start");
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
		console.log("HomePage ngOnInit end");
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
    let modal = this.modalCtrl.create(ItemFilterPage);
    modal.present();
  }
}
