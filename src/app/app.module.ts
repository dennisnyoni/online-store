import { NgModule } from '@angular/core';
import { NgxStripeModule } from "ngx-stripe";
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    ShoppingCartStatusComponent,
    AdminDashBoardComponent,
    VendorDashBoardComponent,
    CustomerDashBoardComponent
  ],

    imports: [
        NgxStripeModule.forRoot(environment.stripe.publicKey),
        BrowserModule,
        BrowserAnimationsModule,
        ProductModule,
        HttpClientModule,
        MatDialogModule,
        PaymentModule,
        ShoppingCartModule,
        AppRoutingModule,
        RouterTestingModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,


    ],
  providers: [
    HttpClientModule,
    MatDialogModule,

    {
      provide:MatDialogRef,
      useValue:[]
    },{
    provide: MAT_DIALOG_DATA,
      useValue:[]
    }],
  bootstrap:[AppComponent]
})
export class AppModule { }
