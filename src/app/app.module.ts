import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from './service/auth.service';
import { ClientPage } from '../pages/client/client';
import { CategorysPage } from '../pages/client/categorys/categorys';
import { FavoritesPage } from '../pages/client/favorites/favorites';
import { ProductsPage } from '../pages/client/products/products';
import { InvoicesPage } from '../pages/client/invoices/invoices';
import { CategoryService } from './service/category.service';
import { FavoriteService } from './service/favorite.service';
import { InvoiceLineService } from './service/invoice-line.service';
import { InvoiceService } from './service/invoice.service';
import { UserService } from './service/user.service';
import { ProfileUpdatePage } from '../pages/client/configuration/update-profile/update-profile';
import { ConfigurationPage } from '../pages/client/configuration/configuration';
import { ProductService } from './service/product.service';
import { CartPage } from '../pages/client/cart/cart';
import { FormInvoicePage } from '../pages/client/invoices/form-invoice/form-invoice';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ClientPage,
      CategorysPage,
      FavoritesPage,
      ProductsPage,
      InvoicesPage,
        FormInvoicePage,
      CartPage,
      ConfigurationPage,
        ProfileUpdatePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ClientPage,
      CategorysPage,
      FavoritesPage,
      ProductsPage,
      InvoicesPage,
        FormInvoicePage,
      CartPage,
      ConfigurationPage,
        ProfileUpdatePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    CategoryService,
    FavoriteService,
    InvoiceLineService,
    InvoiceService,
    UserService,
    ProductService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
