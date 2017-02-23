import { Injectable } from '@angular/core';
declare var QB: any;

@Injectable()
export class QuickBlox {
  uuid = '';
  auth = { 'login': '', 'password': '' };
  connectStatus = false;
  constructor() { }

  getUuid (): string {
    return this.uuid;
  }

  setUuid (data: string) {
    this.uuid = data;
  }

  isConnected() {
    return this.connectStatus;
  }

  setConnectStatus(data) {
    this.connectStatus = data;
  }

  sendSystemMessage() {
	  if (this.connectStatus) {
		  var message = {
		    body: new Date().toLocaleTimeString(),
		    extension: {
		      yachin: 'yachin',
		      param2: 'value2'
		    }
		  };

		  var opponentId = 24475663;
		  QB.chat.sendSystemMessage(opponentId, message);
	  } else {
		  alert('please login ');
	  }
  }

  init(events: any, notifications: any) {
    if (this.uuid == '') {
      this.uuid = '0123456789012345'
	}
    this.auth.login = this.uuid;
    this.auth.password = this.uuid;

    QB.init(54006, '2PGBgPZUjCv-DTJ', 'yd5hdAzgKDrusBb');
    this.join(this.auth).then((data) => {
      //alert('quickblox:connected.[' + JSON.stringify(data) + ']' + new Date().toLocaleTimeString());
      events.publish('quickblox:connected');
    }, (error) => {
      //alert('error.[' + JSON.stringify(error) + ']' + new Date().toISOString());
	  events.publish('quickblox:disconnected');
    });

	QB.chat.onSystemMessageListener = function(msgObj) {
		//alert("onSystemMessageListener : " + JSON.stringify(msgObj));
		notifications.push({
			'title' : msgObj.body + 'に空室が出ました！',
			'text': msgObj.extension.yachin
		});
	};

	QB.chat.onMessageErrorListener = function(error, message){
      //alert("onMessageErrorListener : " + JSON.stringify(error) + ":" + JSON.stringify(message));
	};

	QB.chat.onDisconnectedListener = function() {
      events.publish('quickblox:disconnected');
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
