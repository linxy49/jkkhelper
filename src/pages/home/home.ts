import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { JkkData } from '../providers/jkk-data.ts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public jkkData: JkkData) {

  }

  ngOnInit() {
    console.log("ngOnInit")
//    this.JkkData.getData().subscribe(
//    );
  }

}
