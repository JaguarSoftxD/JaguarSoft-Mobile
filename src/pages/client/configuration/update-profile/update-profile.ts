import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserService } from '../../../../app/service/user.service';
import { ConfigurationPage } from '../configuration';

@Component({
  selector: 'update-profile',
  templateUrl: 'update-profile.html'
})
export class ProfileUpdatePage {
  private idClient:any;
  private userUpdate = {
      email: '',
      firstname: '',
      lastname: '',
      phone: '',
      address: '',
      nit: '',
      image: '',
      user_id: 0,
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
    this.idClient = localStorage.getItem('profile_id');
    console.log(this.idClient)
    this.userService.getSingle(this.idClient)
    .then(response => {
      console.log(response.user[0].firstname)
      console.log(response.user[0].firstname)
        this.userUpdate.email = response.user[0].email;
        this.userUpdate.firstname = response.user[0].firstname;
        this.userUpdate.lastname = response.user[0].lastname;
        this.userUpdate.image = response.user[0].image;
        this.userUpdate.phone = response.user[0].phone;
        this.userUpdate.address = response.user[0].address;
        this.userUpdate.nit = response.user[0].nit;
        this.userUpdate.password = response.user[0].password;
        this.userUpdate.user_id = this.idClient;
    }).catch(error => {
        console.clear();
    })
  }

  //Insertar Datos
  public update(){
    this.userService.updated(this.userUpdate)
    .then(response => {
      let loader = this.loading.create({
        content: "Actualizando Cuenta...",
        duration: 2000
      });
      loader.present();
      this.navCtrl.setRoot(ConfigurationPage);
      console.clear
    }).catch(error => {
      console.clear();
    })
  }

}
