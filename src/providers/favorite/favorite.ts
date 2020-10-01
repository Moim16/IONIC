import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {LocalNotifications} from '@ionic-native/local-notifications';
@Injectable()
export class FavoriteProvider {
  favorites: Array<any>;

  constructor(public http: Http,
    private dishservice: DishProvider, 
    private storage: Storage,
    private localNotifications:LocalNotifications) {
      this.favorites=[];
      storage.get('favorites').then(favorites => {
        if(favorites){
          this.favorites=favorites;
        }else{
          console.log("not defined favorites");
        }
      })
    }


  addFavorite(id: number): boolean {

    if (!this.isFavorite(id)) {
      this.favorites.push(id);

      this.localNotifications.schedule({
        id: id,
        text: 'Dish ' + id + ' added as a favorite'
      });

    }

    return true;
  }

  getFavorites(): Observable<Dish[]> {
    
    this.storage.get('favorites').then((val) => { 
      if(val != null){
      val.forEach(element => {
       this.favorites.push(element);    
     }); 
     }
    });       
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }
  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  
  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set('favorites', this.favorites);
      return this.getFavorites();
    }
    else {
      let txt = 'Deleting non-exiting favorite ';
      console.log(txt, id);
      return Observable.throw(txt + id);
    }
  }

      
 
}



