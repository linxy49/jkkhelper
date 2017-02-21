
import { Events } from 'ionic-angular';
import {Injectable} from '@angular/core';
declare var QB: any;

@Injectable()
export class QuickBlox {
  private auth = { login: '', password: '', userId: '', full_name: '', tag_list: '' };
  private connectStatus = false;
  constructor(public events: Events) {}

  setConnectStatus(data: any) {
    this.connectStatus = true;
    this.events.publish('quickblox:connected', Date.now());
  }

  getConnectStatus() {
    return this.connectStatus;
  }

  init(id: any) {
    if (id) {
      this.auth.login = id;
      this.auth.password = id;
      this.auth.full_name = id;
      this.auth.tag_list = id;
    }
    QB.init(54006, '2PGBgPZUjCv-DTJ', 'yd5hdAzgKDrusBb');

	QB.createSession(this.auth, function(loginErr, loginUser){
		if (loginErr) {
			console.log("loginErr:" + loginErr);
			QB.createSession(function(creatErr, session) {
				if (creatErr) {
					console.log("createSession creatErr:" + creatErr);
				} else {
					console.log("createSession session:" + session);
				}
			});
		} else {
			console.log("loginUser:" + loginUser);
		}
	})

  }

  create(data: any): any {
    console.log("createUser start");
	console.log("createUser end");
  }

  login(data: any): any {
    console.log("loginUser start");
	console.log("loginUser end");
  }
}
