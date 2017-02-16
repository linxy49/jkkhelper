import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { JkkData } from '../providers/jkk-data';


import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: any;

  constructor(
    public navCtrl: NavController,
    public http: Http
    //public jkkData: JkkData
    ) {
      this.http.get(
        'http://45.55.2.139/api/v1'
      ).map(
        response => response.json()
      ).subscribe(
        function(response) {
          console.log("Success Response" + response)
        }, function(error) {
          console.log("Error happened" + error)
        }, function() {
          console.log("the subscription is completed")
        }
      );
    }

  ngOnInit() {
    console.log("ngOnInit")
//    this.JkkData.getData().subscribe(
//    );
  }

}
