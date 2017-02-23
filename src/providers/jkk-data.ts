
import {Injectable}     from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class JkkData {
  private API = "http://45.55.2.139/api/v1"
  data: any;
  constructor(private http: Http) {}

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get(this.API + "/list").map(this.processData);
    }
  }

  processData(data: any) {
    this.data = data.json();
    this.data.tracks = [];

    this.data.data.list.forEach((item: any) => {
      this.data.tracks.push(item.sikubu);
    });
    var ary = Array.from(new Set(this.data.tracks));
    this.data.tracks = ary;
    console.log(this.data.tracks);
    return this.data;
  }

  getTracks() {
    return this.load().map((data: any) => {
      return data.tracks.sort();
    });
  }

  getData() {
    let params: URLSearchParams = new URLSearchParams();
    var response = this.http.get(this.API + "/list", {
      search: params
    }).map(res => res.json());
    return response;
  }
}
