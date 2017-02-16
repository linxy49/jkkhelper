import {Injectable} from  'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import 'rxjs/Rx';

/*
  Generated class for the Jkkdata provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JkkData {

  constructor(public http: Http) {
    console.log('Hello Jkkdata Provider');
  }

  getData() {
    let url = "http://45.55.2.139/api/v1/list";
  }
}
