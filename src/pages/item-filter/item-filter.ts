import { Component } from '@angular/core';

import { NavParams, NavController, ViewController } from 'ionic-angular';

import { JkkData } from './../../providers/jkk-data';

@Component({
  selector: 'page-item-filter',
  templateUrl: 'item-filter.html'
})
export class ItemFilterPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];

  constructor(
    public jkkData: JkkData,
    public navParams: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
    // passed in array of track names that should be excluded (unchecked)
    let excludedTrackNames = this.navParams.data;
    console.log(excludedTrackNames);

    this.jkkData.getTracks().subscribe((trackNames: string[]) => {

      trackNames.forEach(trackName => {
        this.tracks.push({
          name: trackName,
          isChecked: true
      //    ,isChecked: (excludedTrackNames.indexOf(trackName) === -1)
        });
      });

    });
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    this.dismiss();
  }

  dismiss() {
      this.viewCtrl.dismiss();
  }
}
