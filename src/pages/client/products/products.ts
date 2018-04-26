import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ProductService } from '../../../app/service/product.service';
import { CategoryService } from '../../../app/service/category.service';
import { FavoriteService } from '../../../app/service/favorite.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  private products:any[] = [];
  private parameter:any;
  private search:any;

  constructor(
    public navCtrl: NavController,
    public categoryService: CategoryService,
    public productsService: ProductService,
    public favoriteService: FavoriteService,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public toast: ToastController
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
    this.categoryService.getAllSubCategoryProduct(id)
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
    this.toast.create({
      message: 'Agregado al carrito.',
      duration: 1500
    }).present();
  }

  public addFavorite(id:any){
    let favorite = {
      product_id: id,
      user_id: localStorage.getItem('profile_id')
    }
    console.log(favorite)
    this.favoriteService.create(favorite)
    .then(res => {
      this.toast.create({
        message: 'Agregado a favoritos.',
        duration: 1500
      }).present();
    }).catch(error => {
      console.log(error);
    })
  }

  //BUSCAR USUARIOS
  public searchTable() {
    var value = this.search.toLowerCase();
    $("#myList ion-card").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }

}
