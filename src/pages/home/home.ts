import { OnInit, Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { ItemFilterPage } from '../item-filter/item-filter';

import { JkkData } from './../../providers/jkk-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  segment = 'all';
  excludeTracks: any = [];
  items;
  updated_at;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private jkkData: JkkData
  ) {
    this.items = [];
    this.updated_at = "";
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
    console.log('Begin async operation', refresher);
    this.jkkData.getData().subscribe(
      (response) => {
        console.log('search results', response.data);
        this.items = response.data.list
        this.updated_at = response.data.updated_at
      }, (error) => {
        console.log("Error Searching: " + error)
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
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ItemFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      console.log(data);
      if (data) {
        this.excludeTracks = data;
      }
    });
  }
}
