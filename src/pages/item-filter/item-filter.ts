import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-item-filter',
  templateUrl: 'item-filter.html'
})
export class ItemFilterPage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) { }

  resetFilters() {
  }

  applyFilters() {
  }

  dismiss() {
      this.viewCtrl.dismiss();
  }
}
