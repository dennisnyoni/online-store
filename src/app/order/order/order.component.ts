import { Component } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Order} from 'src/app/Model/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  order!: Order;
  cartItems: any=[];
  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit(){
    this.order = new Order();
    this.order.items = this.shoppingCartService.getCartItems();

  }
  confirmOrder() {

  }
}
