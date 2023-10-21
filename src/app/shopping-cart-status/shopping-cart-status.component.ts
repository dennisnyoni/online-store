import { Component } from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart-status',
  templateUrl: './shopping-cart-status.component.html',
  styleUrls: ['./shopping-cart-status.component.css']
})
export class ShoppingCartStatusComponent {

  cartItems: any[] = [];
  total: number = 0;
  totalQuantity: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {

    //this.total = shoppingCartService.;
    for(let item of this.shoppingCartService.getCartItems()){
      this.totalQuantity += item.quantity;
    }
  }

  ngOnInit(){
    for(let item of this.shoppingCartService.getCartItems()){
      this.totalQuantity += item.quantity;
    }

  }
}
