import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { path } from "./../../../app/config.module";
import { CategoryService } from '../../../app/service/category.service';
import { ProductsPage } from '../products/products';

@Component({
  selector: 'categorys',
  templateUrl: 'categorys.html'
})
export class CategorysPage {
  //Propiedades
  private categorys:any[] = [];
  private baseId:number = path.id;
  private pictureCategories:any;
  private idClient:any;

  constructor(
    public navCtrl: NavController,
    public categorysService: CategoryService,
    public loading: LoadingController,
    public alertCtrl:AlertController
  ) {
    this.loadAll();
  }

  //Cargar los productos
  public loadAll(){
    this.categorysService.getAll()
    .then(response => {
      console.log(response.category)
      this.categorys = response.category;
      console.log(response)
    }).catch(error => {
      console.clear;
    })
  }

  //Ver Productos de la Categoria
  public seeProducts(parameter:any) {
    this.loading.create({
        content: "Cargando",
        duration: 750
    }).present();
    this.navCtrl.push(ProductsPage, { parameter });
  }


}