import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProductService } from '../../../app/service/product.service';
import { CategoryService } from '../../../app/service/category.service';

@Component({
  selector: 'products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  private products:any[] = [];
  private parameter:any;

  constructor(
    public navCtrl: NavController,
    public categoryService: CategoryService,
    public productsService: ProductService,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    this.parameter = this.navParams.get('parameter');
    if(this.parameter) {
      this.loadAllProductByCategory(this.parameter)
    } else {
      this.loadAllProduct();
    }
  }

  public loadAllProduct() {
    this.productsService.getAll()
    .then(res => {
      this.products = res.product;
    }).catch(error => {
      console.log(error)
    })
  }

  public loadAllProductByCategory(id:any) {
    this.categoryService.getAllProducts(id)
    .then(res => {
      this.products = res.products;
    }).catch(error => {
      console.log(error);
    })
  }

  public addToCart(product:any) {
    console.log(product)
    let carrito:any[] = []
    console.log(localStorage.getItem('carrito'))
    carrito = JSON.parse(localStorage.getItem('carrito'))
    carrito.push(product)
    localStorage.removeItem('carrito')
    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(carrito)
  }

}
