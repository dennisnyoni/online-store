import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Order} from "../../Model/order";
import {AuthService} from "../../services/auth.service";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit{

  order!: Order;
  userId!: string;
  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService,
              private orderService: OrderService) {
  }
  ngOnInit(): void {

  }




}
