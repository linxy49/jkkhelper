
import {Injectable}     from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class JkkData {

	private DOMAIN = "http://45.55.2.139";
	private VERSION = "v1"

	data: any;

	constructor(private http: Http) {
		//console.log("JkkData constructor");
	}

	load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
			var url = this.DOMAIN + "/api/" + this.VERSION;
			return this.http.get(url + "/list").map(this.processData);
    }
  }

	processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();
		//console.log(this.data.data.list);
    this.data.tracks = [];

    // loop through each day in the schedule
    this.data.data.list.forEach((item: any) => {
      // loop through each timeline group in the day
			this.data.tracks.push(item.sikubu);
		});
		// Array.from & Setを使用した場合
		var ary = Array.from(new Set(this.data.tracks));
		this.data.tracks = ary;
		console.log(this.data.tracks);
    return this.data;
  }

	getTracks() {
    return this.load().map((data: any) => {
      return data.tracks.sort();
			//return data.tracks;
    });
  }

	getData() {
		//console.log("JkkData getData start.");
		var url = this.DOMAIN + "/api/" + this.VERSION;

		let params: URLSearchParams = new URLSearchParams();

		var response = this.http.get(url + "/list", {
			search: params
		}).map(res => res.json());
		//console.log("JkkData getData end.");
		return response;
	}
}
