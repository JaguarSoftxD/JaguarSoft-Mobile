import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { InvoiceService } from '../../../../app/service/invoice.service';
import { InvoiceLineService } from '../../../../app/service/invoice-line.service';
import { InvoicesPage } from '../invoices';

@Component({
  selector: 'form-invoice',
  templateUrl: 'form-invoice.html'
})
export class FormInvoicePage {
  private invoiceTemp:any[] = []
  private products:any[] = []
  private now:any;
  private factura:boolean = false;
  private invoice = {
    user_id: localStorage.getItem('profile_id'),
    invoice_id: 0,
    amount: 0,
    invoice_date: '',
    name: localStorage.getItem('username'),
    nit: localStorage.getItem('nit'),
  }
  invoiceDetail = {
    amount: 0,
    user_id: localStorage.getItem('profile_id')
  }

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public invoiceService: InvoiceService,
    public invoiceLineService: InvoiceLineService,
    public load: LoadingController,
    public loading: LoadingController) {
    this.products = JSON.parse(localStorage.getItem('carrito'))
    this.loadInvoice();
    this.dateNow();
    this.calcAmount();
  }

  public dateNow() {
    let date = new Date();
    let month = date.getMonth()+1;
    let month2;
    let dia= date.getDate();
    let dia2;
    if(month<10){
      month2='0'+month;
    }else{
      month2=month
    }
    if(dia<10){
      dia2='0'+dia;
    }else{
      dia2=dia
    }
    this.now= date.getFullYear()+'-'+month2+'-'+dia2
    this.invoice.invoice_date = this.now;
  }

  public loadInvoice() {
    this.invoiceService.getAll()
    .then(res => {
      console.log(this.invoice)
      this.invoiceTemp = res.invoice;
      console.log(this.invoiceTemp)
      this.invoiceTemp.reverse();
      console.log(this.invoiceTemp)
      console.log(+this.invoiceTemp[0].invoice_id + 1)
      this.invoice.invoice_id = +this.invoiceTemp[0].invoice_id + 1
    }).catch(error => {

    })
  }

  public calcAmount() {
    let a:number = 0;
    let b:number = 0;
    for(let x of this.products) {
        a = x.price;
        b += a;
      }
    this.invoice.amount = b;
  }

  public saveChanges() {
    let id = this.invoice.invoice_id;
    console.log(this.invoiceDetail)
    this.invoiceService.create(this.invoice)
    .then(res => {
      console.log(res)
      this.loading.create({
        content: 'Procesando Compra...',
        duration: 4000
      }).present()
      for(let x of this.products) {
        let productCart = {
          product_id: x.product_id,
          invoice_id: id,
          qty: 1,
          price: x.price,
          subtotal: 1 * x.price,
        }        
        console.log(productCart)
        this.invoiceLineService.create(productCart)
        .then(res => {}
        ).catch(error => {
          console.log(error);
        })
      }
      
      this.navCtrl.setRoot(InvoicesPage)
    }).catch(error => {
      console.log(error)
    })
    localStorage.removeItem('cart')
    localStorage.setItem('cart', JSON.stringify([]))
  }




}
