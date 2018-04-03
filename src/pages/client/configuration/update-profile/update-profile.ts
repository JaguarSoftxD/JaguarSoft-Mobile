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
  private profileUpdate = {
      email: '',
      firstname: '',
      lastname: '',
      birthday: '',
      phone: '',
      address: '',
      nit: '',
      profile_id: 0
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
      console.log(response.profile[0].firstname)
      console.log(response.profile[0].firstname)
        this.profileUpdate.email = response.profile[0].email;
        this.profileUpdate.firstname = response.profile[0].firstname;
        this.profileUpdate.lastname = response.profile[0].lastname;
        this.profileUpdate.birthday = response.profile[0].birthday;
        this.profileUpdate.phone = response.profile[0].phone;
        this.profileUpdate.address = response.profile[0].address;
        this.profileUpdate.nit = response.profile[0].nit;
        this.profileUpdate.profile_id = this.idClient;
    }).catch(error => {
        console.clear();
    })
  }

  //Insertar Datos
  public update(){
    this.userService.updated(this.profileUpdate)
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
