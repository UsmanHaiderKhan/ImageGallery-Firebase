import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  sliderDetailsList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) {}
  getSliderDetailList() {
    this.sliderDetailsList = this.firebase.list('sliderDetails');
  }

  addSliderDetails(sliderDetails) {
    this.sliderDetailsList.push(sliderDetails);
  }
}
