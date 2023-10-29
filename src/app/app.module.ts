import { NgModule } from '@angular/core';
import { NgxStripeModule } from "ngx-stripe";
//import { StripeModule } from "ngx-stripe";
import { environment } from "../../environment";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HomeComponent} from "./home/home/home.component";
import {ProductModule} from "./product/product.module";
import {HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {PaymentModule} from "./payment/payment.module";
import {ShoppingCartModule} from "./shopping-cart/shopping-cart.module";
import {RouterTestingModule} from "@angular/router/testing";
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './login/login.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import { ShoppingCartStatusComponent } from './shopping-cart-status/shopping-cart-status.component';
import { CustomerDashBoardComponent } from './dashboards/customer-dash-board/customer-dash-board.component';
import {AdminDashBoardComponent} from "./dashboards/admin-dash-board/admin-dash-board.component";
import {VendorDashBoardComponent} from "./dashboards/vendor-dash-board/vendor-dash-board.component";
import {RegisterComponent} from "./register/register.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from "@angular/material/select";
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {JwtInterceptor} from "./jwt-interceptor";
import { FileUploadModule } from "ng2-file-upload";
import { SearchComponent } from './search/search.component';
import {UserModule} from "./user/user.module";
import { GuestDashBoardComponent } from './dashboards/guest-dash-board/guest-dash-board.component';
import {OrderModule} from "./order/order.module";
import {CreateOrderComponent} from "./order/create-order/create-order.component";
//import { ShipInComponent } from './ship-in/ship-in.component';
import { CreateShipInComponent } from './ship-in/create-ship-in/create-ship-in.component';
import { ShipInListComponent } from './ship-in/ship-in-list/ship-in-list.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepicker} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";

export function jwtOptionsFactory() {
    return {
        tokenGetter: () => {
            return localStorage.getItem('jwt_token');
        },
        allowedDomains: ['localhost'], // Whitelist the API domain.
    };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    ShoppingCartStatusComponent,
    AdminDashBoardComponent,
    VendorDashBoardComponent,
    CustomerDashBoardComponent,
    RegisterComponent,
    SearchComponent,
    GuestDashBoardComponent,
    //ShipInComponent,
    CreateShipInComponent,
    ShipInListComponent,


  ],

  imports: [
    NgxStripeModule.forRoot(environment.stripe.publicKey),
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    //ProductModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    //PaymentModule,
    UserModule,
    //OrderModule,
    ShoppingCartModule,
    AppRoutingModule,
    RouterTestingModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    FileUploadModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),

  ],
  providers: [
    HttpClientModule,
    MatDialogModule,
    JwtInterceptor,
    {
      provide: MatDialogRef,
      useValue: []
    }, {
      provide: MAT_DIALOG_DATA,
      useValue: []
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-US' }
  ],
  exports: [
    CreateShipInComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
