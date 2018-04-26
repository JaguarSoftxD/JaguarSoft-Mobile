import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { FormInvoicePage } from '../invoices/form-invoice/form-invoice';
//JQUERY
declare var $:any;

@Component({
  selector: 'cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  private products:any[] = []
  private search:any;

  constructor(public navCtrl: NavController,
    public toast: ToastController,
    public alertCtrl: AlertController) {
    this.products = JSON.parse(localStorage.getItem('carrito'))
  }

  public deleteCar(e:any) {
    this.products.splice(this.products.indexOf(e),1)
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify(this.products))
    this.toast.create({
      message: 'Producto eliminado del carrito.',
      duration: 1500
    }).present();
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

  //BUSCAR USUARIOS
  public searchTable() {
    var value = this.search.toLowerCase();
    $("#myList ion-card").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }

}
