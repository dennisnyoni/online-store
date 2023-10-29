import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
//import Array from "$GLOBAL$";

@Component({
  selector: 'app-guest-dash-board',
  templateUrl: './guest-dash-board.component.html',
  styleUrls: ['./guest-dash-board.component.css']
})
export class GuestDashBoardComponent implements OnInit{

  totalQuantity: number = 2777;
  totalAmount!:number;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.calculateTotalQuantity();
  }

   calculateTotalQuantity(): number {
    const cartItems = this.shoppingCartService.getCartItems();
    this.totalQuantity = Array.from(cartItems.values()).reduce((total: number, quantity: number) => total + quantity, 0);
    return this.totalQuantity;
  }

  ngOnInit(): void {
    this.totalQuantity =this.shoppingCartService.getTotalItemsInCart();
    console.log('quantity from guest dash :', this.totalQuantity)
  }
}
