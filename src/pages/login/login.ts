import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../app/service/auth.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ClientPage } from '../client/client';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private user:any = {
    email:"",
    password: ""
  }

  constructor(public navCtrl: NavController,
  public authService: AuthService,
  public loading: LoadingController,
  public toast: ToastController) {

  }

  public authentication() {
    console.log(this.user)
    this.authService.authentication(this.user)
    .then(res => {
      console.log(res)
      localStorage.setItem('profile_id', res.user[0].user_id);
      localStorage.setItem('username', res.user[0].firstname + ' ' + res.user[0].lastname);
      localStorage.setItem('nit', res.user[0].nit);
      localStorage.setItem('email', res.user[0].email);
      localStorage.setItem('address', res.user[0].address);
      localStorage.setItem('carrito', JSON.stringify([]))
      this.loading.create({
        content: 'Iniciando Sesión...',
        duration: 1500
      }).present();
      this.navCtrl.setRoot(ClientPage);
    }).catch(error => {
      this.toast.create({
        message: 'Usuario o contraseña incorrectos.',
        duration: 1500
      }).present();
      console.log(error)
    })
  }

  public register() {
    this.navCtrl.push(RegisterPage)
  }

}
