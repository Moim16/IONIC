import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  image: string = 'assets/images/logo.png';


  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private camera: Camera,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {

    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  dismiss() {
    this.viewCtrl.dismiss(true);
  }

  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT
    }
    this.camera.getPicture(options)
      .then((imageData) => {
        this.image = imageData;
        console.log(imageData);
      },
        (err) => {
          console.log('Error obtaining picture')
        });
  }

  getFromLibrary() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options)
      .then((imageData) => {
        this.image = "data:image/jpeg;base64," + imageData;
        console.log(imageData);
      },
        (err) => {
          console.log('Error obtaining picture')
        });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.dismiss();
  }

}