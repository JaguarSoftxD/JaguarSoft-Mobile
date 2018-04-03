import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormInvoicePage } from '../invoices/form-invoice/form-invoice';

@Component({
  selector: 'cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  private products:any[] = []

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController) {
    this.products = JSON.parse(localStorage.getItem('carrito'))
  }

  public viewForm() {
    let confirm = this.alertCtrl.create({
      title: '¿Deseas adquirir todos los articulos?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.setRoot(FormInvoicePage)
          }
        }
      ]
    });
    confirm.present();
  }

}
