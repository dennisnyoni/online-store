import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    OrderComponent
  ],
  exports: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class OrderModule { }
