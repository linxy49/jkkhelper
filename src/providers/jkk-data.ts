
import { Injectable } from '@angular/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JkkData {

  constructor() {
    console.log('Hello Jkkdata Provider');
  }

  getData() {
//    var url = "http://45.55.2.139/api/v1/list";
//    var response = this.http.get(url).map(res => res.json());
//    return response;
  }
}
