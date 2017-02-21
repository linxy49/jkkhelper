
import { Events } from 'ionic-angular';
import {Injectable} from '@angular/core';
declare var QB: any;

@Injectable()
export class QuickBlox {
  private auth = { 'login': '', 'password': '' };
  private connectStatus = false;
  constructor(public events: Events) {}

  setConnectStatus() {
    this.connectStatus = true;
    console.log('quickblox:connected');
    this.events.publish('quickblox:connected', Date.now());
  }

  getConnectStatus() {
    return this.connectStatus;
  }

  init(id: any) {
    if (id) {
      this.auth.login = id;
      this.auth.password = id;
    }
    QB.init(54006, '2PGBgPZUjCv-DTJ', 'yd5hdAzgKDrusBb');
    this.join(this.auth).then(function(response){
      console.log(response);
      QB.chat.connect({
          'userId': response.id,
          'login': response.login,
          'password': response.login
      }, function(err, res) {
        if (err) {
          console.log("connect err", err);
        } else {
          console.log("connect res", res);
          this.setConnectStatus();
          console.log('quickblox:connected');
        }
      });
    }, function(error){
      console.log(error);
    });
  }

  join(data: any): any {
    return new Promise(function(resolve, reject) {
        QB.createSession(function(csErr, csRes){
            if(csErr) {
              reject(csErr);
            } else {
              QB.login(data, function(loginErr, loginUser){
                if (loginErr) {
                  QB.users.create({
                    'login': data.login,
                    'password': data.password,
                    'full_name': data.login,
                    'tag_list': 'test'
                  }, function(createErr, createUser){
                    if (createErr) {
                      reject(createErr);
                    } else {
                      QB.login({
                        'login': data.login,
                        'password': data.password
                      }, function(reloginErr, reloginUser) {
                        if(reloginErr) {
                          reject(reloginErr);
                        } else {
                          resolve(reloginUser);
                        }
                      });
                    }
                  });
                } else {
                  resolve(loginUser);
                }
              });
            }
        });
    });
  }
}
