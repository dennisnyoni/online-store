import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import {
  StripeCardComponent,
  StripeCardCvcComponent,
  StripeCardExpiryComponent,
  StripeCardGroupDirective,
  StripeCardNumberComponent
} from "ngx-stripe";
import {ReactiveFormsModule} from "@angular/forms";
import { CheckOutComponent } from './check-out/check-out.component';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {OrderModule} from "../order/order.module";



@NgModule({
    declarations: [
        MakePaymentComponent,
        CheckOutComponent
    ],
    exports: [
        MakePaymentComponent
    ],
  imports: [
    CommonModule,
    StripeCardExpiryComponent,
    StripeCardCvcComponent,
    StripeCardNumberComponent,
    ReactiveFormsModule,
    StripeCardGroupDirective,
    StripeCardComponent,
    MatInputModule,
    MatCardModule,
    OrderModule
  ]
})
export class PaymentModule { }
