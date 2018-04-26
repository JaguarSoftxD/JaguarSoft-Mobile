import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { path } from "./../../../app/config.module";
import { CategoryService } from '../../../app/service/category.service';
import { ProductsPage } from '../products/products';
import { SubCategorysPage } from './subcategory/subcategory';

@Component({
  selector: 'categorys',
  templateUrl: 'categorys.html'
})
export class CategorysPage {
  private categorys:any[] = [];

  constructor(
    public navCtrl: NavController,
    public categorysService: CategoryService,
    public loading: LoadingController,
    public alertCtrl:AlertController
  ) {
    this.loadAll();
  }

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

  public seeSubCategorys(parameter:any) {
    this.loading.create({
        content: "Cargando...",
        duration: 500
    }).present();
    this.navCtrl.push(SubCategorysPage, { parameter });
  }


}