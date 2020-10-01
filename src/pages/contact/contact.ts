import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import {CallNumber} from '@ionic-native/call-number';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController,
    private emailComposer: EmailComposer,
    public navParams: NavParams,
    private callNumber:CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contact');
  }
  callRestaurant() {
    this.callNumber.callNumber("85212345678", true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  sendEmail() {
    let email = {
      to: 'moisesmejiam16@gmail.com',
      subject: '[ConFusion] Question',
      body: 'Dear purveyer of fine food, ',
      isHtml: true
    }

    this.emailComposer.open(email);

  }

}