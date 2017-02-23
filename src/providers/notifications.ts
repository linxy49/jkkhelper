import { Injectable } from '@angular/core';
import { LocalNotifications } from 'ionic-native';
import { AlertController } from 'ionic-angular';

@Injectable()
export class Notifications {
  constructor(private alertController: AlertController) { }

  push(data: any) {
    LocalNotifications.schedule({
      id: Math.floor(Math.random() * (10000 )) + 1,
      title: data.title,
      text: data.text
    });
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
