import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserService } from '../../app/service/user.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private profileUpdate = {
    register: '',
    image: 'https://png.icons8.com/android/1600/user.png',
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    nit: '',
    password: ''
}
  
  //Constructor
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public userService: UserService,
    public loading: LoadingController
  ) {
  }

  //Insertar Datos
  public saveChanges(){
    this.userService.create(this.profileUpdate)
    .then(response => {
      let loader = this.loading.create({
        content: "Inicie Sesión...",
        duration: 3500
      });
      loader.present();
      this.navCtrl.setRoot(LoginPage);
      console.clear
    }).catch(error => {
      console.clear;
    })
  }

}
