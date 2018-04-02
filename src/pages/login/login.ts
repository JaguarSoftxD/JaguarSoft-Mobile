import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private user:any = {
    username:"",
    password: ""
  }

  constructor(public navCtrl: NavController) {

  }

}
