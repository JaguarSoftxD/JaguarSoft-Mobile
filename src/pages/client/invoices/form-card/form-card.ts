import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { InvoiceService } from '../../../../app/service/invoice.service';
import { InvoiceLineService } from '../../../../app/service/invoice-line.service';
import { InvoicesPage } from '../invoices';

@Component({
  selector: 'form-card',
  templateUrl: 'form-card.html'
})
export class FormCardPage {
  private invoiceTemp:any[] = []
  private products:any[] = []
  private p:any[] = []
  private now:any;
  private factura:boolean = false;
  private formcard = {
    tipo: '',
    numCard: '',
    cvv: '',
    name: '',
    mm: '',
    dd: ''
  }
  
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
  public prueba = {
    "user" : {
        "name": localStorage.getItem('username'),
        "email": localStorage.getItem('email'),
        "nit": localStorage.getItem('nit'),
        "phone": localStorage.getItem('phone'),
        "address": localStorage.getItem('address')
    },
    "order": {
        "number": 0,
        "date": '',
        "total": 0
    },
    "lines": this.p
}

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public invoiceService: InvoiceService,
    public toast:ToastController,
    public invoiceLineService: InvoiceLineService,
    public load: LoadingController,
    public loading: LoadingController) {
    this.products = JSON.parse(localStorage.getItem('carrito'))
    this.loadInvoice();
    this.loadProduct();
    this.dateNow();
    this.calcAmount();
  }

  loadProduct() {
    for(let x of this.products) {
      if(x.product_name) {
        let p = {
          product: x.product_name,
          quantity: 1, 
          price: x.price
      }
      this.p.push(p)
      } else {
        let p = {
          product: x.name,
          quantity: 1, 
          price: x.price
        }
        this.p.push(p)
      }
        
    }
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
    this.now = dia2 + '/' + month2 + '/' + date.getFullYear();
    this.invoice.invoice_date = this.now;
    this.prueba.order.date = this.now;
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
      this.prueba.order.number = +this.invoiceTemp[0].invoice_id + 1
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
    this.prueba.order.total = b;
  }

  public saveChanges() {
    if(this.formcard.tipo == '1') {
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
      localStorage.removeItem('carrito')
      localStorage.setItem('carrito', JSON.stringify([]))
      this.sendEmail();
    } else if(this.formcard.tipo == '2') {
      if(this.formcard) {
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
      localStorage.removeItem('carrito')
      localStorage.setItem('carrito', JSON.stringify([]))
      this.sendEmail();
      } else {
        this.toast.create({
          message: 'Los campos son requeridos.'
        }).present();
      }
    } else {
      this.toast.create({
        message: 'Seleccione un tipo de Pago.'
      }).present();
    }
  }

  sendEmail() {
    console.log(this.prueba)
    this.invoiceService.generate(this.prueba)
    .then(res => {
      let confirm = this.alertCtrl.create({
        title: 'Gracias por tu Compra!',
        message: 'Te hemos enviado un correo a: ' + localStorage.getItem('email'),
        buttons: [
          {
            text: 'Ok',
            handler: () => {
            }
          }
        ]
      });
      confirm.present();
      console.log(res)
    }).catch(error => {
      console.log(error)
    })
  }


}
