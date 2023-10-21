import { NgModule } from '@angular/core';
import { NgxStripeModule } from "ngx-stripe";
//import { StripeModule } from "ngx-stripe";
import { environment } from "../../environment";
import { BrowserModule } from '@angular/platform-browser';
//import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
//import { JwtInterceptor } from './jwt-interceptor';

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
      GuestDashBoardComponent
  ],

    imports: [
        NgxStripeModule.forRoot(environment.stripe.publicKey),
        BrowserModule,
        BrowserAnimationsModule,
        ProductModule,
        HttpClientModule,
        MatDialogModule,
      MatButtonModule,
      MatIconModule,
        PaymentModule,
      UserModule,
        ShoppingCartModule,
        AppRoutingModule,
        RouterTestingModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
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
      provide:MatDialogRef,
      useValue:[]
    },{
    provide: MAT_DIALOG_DATA,
      useValue:[]
    }
      ],
  bootstrap:[AppComponent]
})
export class AppModule { }
