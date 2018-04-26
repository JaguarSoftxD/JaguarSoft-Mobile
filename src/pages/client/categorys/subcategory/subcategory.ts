import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { CategoryService } from '../../../../app/service/category.service';
import { ProductsPage } from '../../products/products';

@Component({
  selector: 'subcategory',
  templateUrl: 'subcategory.html'
})
export class SubCategorysPage {
  private subcategorys:any[] = [];
  private parameter:any;

  constructor(
    public navCtrl: NavController,
    public categorysService: CategoryService,
    public loading: LoadingController,
    public nav: NavParams,
    public alertCtrl:AlertController
  ) {
    this.parameter = this.nav.get('parameter')
    this.loadAll(this.parameter);
  }

  public loadAll(id:any){
    this.categorysService.getAllSubCategorias(id)
    .then(response => {
      console.log(response.category)
      this.subcategorys = response.subCategories;
      console.log(response)
    }).catch(error => {
      console.clear;
    })
  }

  public seeProducts(parameter:any) {
    this.loading.create({
        content: "Cargando...",
        duration: 500
    }).present();
    this.navCtrl.push(ProductsPage, { parameter });
  }


}