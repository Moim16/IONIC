import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from '../../shared/user';
import { RegisterPage } from '../../pages/register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  user: User = { username: '', password: '' };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private storage: Storage) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });

    storage.get('user').then(user => {
      if (user) {
        this.user = user;
        this.loginForm
          .patchValue({
            'username': this.user.username,
            'password': this.user.password
          });
      }
      else
        console.log('user not defined.');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;

    if (this.loginForm.get('remember').value)
      this.storage.set('user', this.user)
    else
      this.storage.remove('user');
    this.viewCtrl.dismiss();
  }

  openRegister() {
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
    modal.onDidDismiss(() => this.dismiss());
  }

}