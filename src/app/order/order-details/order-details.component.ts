import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../services/product.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Product} from "../../Model/product";
import {OrderService} from "../../services/order.service";
import {Order} from "../../Model/order";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  id!: number;
  currentIndex: number = 0;
  order: any;
  imageUrl = 'assets/image2.jpeg'
  currentImage: any;
  constructor(
    private route: ActivatedRoute,private router: Router,
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.order = new Order();
    this.id = this.data.id;

    this.orderService.getOrder(this.id)
      .subscribe(data => {
        console.log(data);

        this.order = data;
      }, error => console.log(error));
  }

   list() {
    this.dialogRef.close();
    this.router.navigate(['orders']);
  }


}
