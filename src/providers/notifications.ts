import { Injectable } from '@angular/core';
import { LocalNotifications, Vibration } from 'ionic-native';
import { AlertController } from 'ionic-angular';

@Injectable()
export class Notifications {
  constructor(private alertController: AlertController) { }

  push(data: any) {
    LocalNotifications.schedule({
      title: data.title,
      text: data.text,
    });
	Vibration.vibrate([3000,1000,3000]);
  }

  show(data: any) {
    var alertBox = this.alertController.create({
      title: data.title,
      subTitle: data.text,
      buttons: ['Close']
    })
    alertBox.present()
  }
}
