import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Dish} from '../../shared/dish';
@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comment: any;
  dish:Dish;
  comments: Dish;
  private commentForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      rating: ['', Validators.required],
      author: ['', Validators.required],
      comment: ['', Validators.required]      
    });
  }
  onSubmit() {   
    
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
     this.viewCtrl.dismiss(this.comment);
    this.commentForm.reset();
  }  

  dismiss(){
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

}
