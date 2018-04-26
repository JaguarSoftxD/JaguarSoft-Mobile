import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { path } from "./../../app/config.module";
import { CategorysPage } from './categorys/categorys';
import { ProductsPage } from './products/products';
import { ConfigurationPage } from './configuration/configuration';
import { CartPage } from './cart/cart';
import { FavoritesPage } from './favorites/favorites';
import { InvoicesPage } from './invoices/invoices';

@Component({
  selector: 'page-client',
  templateUrl: 'client.html'
})
export class ClientPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = CategorysPage;
  pages: Array<{icon:string, ios:string, title: string, component: any}>;
  private email:any;
  private firstName:any;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loading: LoadingController) {
    //this.initializeApp();
    this.email = localStorage.getItem("email");
    this.firstName = localStorage.getItem("username");
    //this.loadSingleUser();
    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'ios-apps', ios: 'ios-apps', title: 'Categorías', component: CategorysPage },
      { icon: 'ios-albums', ios: 'ios-albums', title: 'Productos', component: ProductsPage },
      { icon: 'ios-star', ios: 'ios-star', title: 'Favoritos', component: FavoritesPage },
      { icon: 'ios-cart', ios: 'ios-cart', title: 'Mi Carrito', component: CartPage },      
      { icon: 'ios-cash', ios: 'ios-cash', title: 'Mis Compras', component: InvoicesPage },
      { icon: 'ios-settings', ios: 'ios-settings', title: 'Configuración de la Cuenta', component: ConfigurationPage }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.loading.create({
      content: "Cargando...",
      duration: 1500
      }).present();
    this.nav.setRoot(page.component);
  }

  logOut() {
    localStorage.clear();
    this.loading.create({
      content: "Cerrando Sesión...",
      duration: 1000
      }).present();
    location.reload()
  }
}
