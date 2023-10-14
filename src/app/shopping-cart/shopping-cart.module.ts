import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
    declarations: [
        ShoppingCartComponent
    ],
    exports: [
        ShoppingCartComponent
    ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class ShoppingCartModule { }
