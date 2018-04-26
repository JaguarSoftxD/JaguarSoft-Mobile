import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ProductService } from '../../../app/service/product.service';
import { CategoryService } from '../../../app/service/category.service';
import { FavoriteService } from '../../../app/service/favorite.service';
//JQUERY
declare var $:any;

@Component({
  selector: 'favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  private products:any[] = [];
  private parameter:any;
  private user_id:any;
  private search:any;
  constructor(
    public navCtrl: NavController,
    public categoryService: CategoryService,
    public productsService: ProductService,
    public favoriteService: FavoriteService,
    public loading: LoadingController,
    public toast: ToastController,
    public alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    this.user_id = localStorage.getItem('profile_id')
    this.loadAllProduct(this.user_id);
  }

  public loadAllProduct(id:any) {
    this.favoriteService.getAllUser(id)
    .then(res => {
      this.products = res.user;
    }).catch(error => {
      console.log(error)
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

  public delete(id:any) {
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
            this.favoriteService.delete(id)
            .then(res => {
              this.toast.create({
                message: 'Favorito eliminado.',
                duration: 1000
              }).present()   
              this.loadAllProduct(this.user_id)           
            }).catch(error => {
              console.log(error)
            })
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
