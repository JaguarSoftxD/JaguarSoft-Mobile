import { Component, AnimationPlayer } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { InvoiceService } from '../../../app/service/invoice.service';
import { ProductsInvoicePage } from './product-invoice/product-invoice';

@Component({
  selector: 'invoices',
  templateUrl: 'invoices.html'
})
export class InvoicesPage {
  private invoices:any[] = [];
  private parameter:any;
  private total:any;
  private user_id:any
  constructor(
    public navCtrl: NavController,
    public invoiceService: InvoiceService,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    this.user_id = localStorage.getItem('profile_id')
    this.loadAll(this.user_id);
  }

  public loadAll(id:any) {
    this.invoiceService.getAllUser(id)
    .then(res => {
      this.invoices = res.user;
      console.log(this.invoices)
    }).catch(error => {
      console.log(error)
    })
  }

  public productInvoice(parameter:any) {
    console.log(parameter)
    this.navCtrl.push(ProductsInvoicePage, { parameter })
    this.loading.create({
      content: 'Ver productos...',
      duration: 2500
    }).present()
    

  }

}
