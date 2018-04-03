import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ProfileUpdatePage } from './update-profile/update-profile';

@Component({
  selector: 'configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {
  private idClient:any;
  
  constructor(
  public navCtrl: NavController,
  public loading: LoadingController
  ) {
    this.idClient = localStorage.getItem('profile_id');
  }

  public changePassword() {
    this.loading.create({
        content: 'Cargando...',
        duration: 500
    }).present();
    //this.navCtrl.push(ChangePasswordProfileClientPage);
  }

  public updateClient() {
    this.loading.create({
        content: 'Cargando...',
        duration: 500
    }).present();
    this.navCtrl.push(ProfileUpdatePage);
  }

}