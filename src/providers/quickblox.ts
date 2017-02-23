import { Injectable } from '@angular/core';
declare var QB: any;

@Injectable()
export class QuickBlox {
  public auth = { 'login': '', 'password': '' };
  public connectStatus = false;
  constructor() { }

  isConnected() {
    return this.connectStatus;
  }

  setConnectStatus() {
    this.connectStatus = true;
  }

  sendSystemMessage() {
	  var message = {
	    body: 'Notification message',
	    extension: {
	      yachin: 'yachin',
	      param2: 'value2'
	    }
	  };

	  var opponentId = 24475663;
	  QB.chat.sendSystemMessage(opponentId, message);
  }

  init(id: string, events: any, notifications: any) {
	alert(id);
    if (id) {
      this.auth.login = id;
      this.auth.password = id;
    }

    QB.init(54006, '2PGBgPZUjCv-DTJ', 'yd5hdAzgKDrusBb');
    this.join(this.auth).then((data) => {
      alert('quickblox:connected');
      events.publish('quickblox:connected');
    }, (error) => {
      alert('quickblox:connected');
    });

	QB.chat.onSystemMessageListener = function(msgObj) {
		notifications.push({
			'title' : msgObj.body + 'に空室が出ました！',
			'text': msgObj.extension.yachin
		});
	};
  }

  join(data: any): any {
    return new Promise(function(resolve, reject) {
      QB.createSession(function(csErr, csRes) {
        if (csErr) {
          reject(csErr);
        } else {
          QB.login(data, function(loginErr, loginUser) {
            if (loginErr) {
              QB.users.create({
                'login': data.login,
                'password': data.password,
                'full_name': data.login,
                'tag_list': 'testuser'
              }, function(createErr, createUser) {
                if (createErr) {
                  reject(createErr);
                } else {
                  QB.login({
                    'login': data.login,
                    'password': data.password
                  }, function(reloginErr, reloginUser) {
                    if (reloginErr) {
                      reject(reloginErr);
                    } else {
                      QB.chat.connect({
                        'userId': reloginUser.id,
                        'login': data.login,
                        'password': data.password
                      }, function(connectErr, connectRes) {
                        if (connectErr) {
                          reject(connectErr);
                        } else {
                          resolve(reloginUser);
                        }
                      });
                    }
                  });
                }
              });
            } else {
              QB.chat.connect({
                'userId': loginUser.id,
                'login': data.login,
                'password': data.password
              }, function(connectErr, connectRes) {
                if (connectErr) {
                  reject(connectErr);
                } else {
                  resolve(loginUser);
                }
              });
            }
          });
        }
      });
    }.bind(this));
  }

}
