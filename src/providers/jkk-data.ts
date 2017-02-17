
import {Injectable}     from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class JkkData {

	private DOMAIN = "http://45.55.2.139";
	private VERSION = "v1"

	constructor(private http: Http) {
		console.log("JkkData constructor");
	}

	getData() {
		console.log("JkkData getData start.");
		var url = this.DOMAIN + "/api/" + this.VERSION;

		let params: URLSearchParams = new URLSearchParams();

		var response = this.http.get(url + "/list", {
			search: params
		}).map(res => res.json());
		console.log("JkkData getData end.");
		return response;
	}
}
