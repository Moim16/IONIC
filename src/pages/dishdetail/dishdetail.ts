import { Component, Inject } from '@angular/core';
import { IonicPage,  NavController, NavParams,
   ToastController, ModalController , 
   ActionSheetController, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import {CommentPage} from '../comment/comment';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  public favorites = [];
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;
  private addform: FormGroup;
  constructor(private socialSharing: SocialSharing,
    private storage: Storage,
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteProvider,    
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController) {
    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);
  }

  
  presentCommentModal() {
    let contactModal = this.modalCtrl.create(CommentPage);
    contactModal.present();
    contactModal.onDidDismiss(comment => {
      if (comment) {
        this.dish.comments.push(comment);
      }
    });
  }


  openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Add to Favorites',
          role: 'destructive',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add Comment',
          handler: () => {
            this.presentCommentModal();
          }
        },        
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        }
      ]
    });
    actionSheet.present();
  }

  addToFavorites() {       

    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message:'Dish '+ this.dish.id + ' added as a favorita succesfully',
      duration:3000
    }).present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

}