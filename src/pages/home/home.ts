import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClientPage } from '../client/client';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
  public loading:LoadingController) {
    if(localStorage.getItem('profile_id')) {
      this.loading.create({
        content: 'Cargando...',
        duration: 1000
      });
      this.navCtrl.setRoot(ClientPage)
    } else {
      this.navCtrl.setRoot(LoginPage)
    }
  }

}
