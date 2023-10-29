import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../Model/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  id!: number;
  product: any;
  imageUrl = 'assets/image2.jpeg'
  currentImage: any;
  constructor(
      private route: ActivatedRoute,private router: Router,
      public dialogRef: MatDialogRef<ProductDetailsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,

      private productService: ProductService,
      private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.product = new Product();
    this.id = this.data.id;

    this.productService.getProductById(this.id)
      .subscribe(data => {
        console.log(data);

        this.product = data;
      }, error => console.log(error));
  }

  addToCart(product: any): void {
    // Add the selected product to the cart
    this.cartService.addToCart(product);
  }

  list() {
    this.dialogRef.close();
     this.router.navigate(['products']);
  }

  onClose() {
    this.dialogRef.close();
    this.router.navigate(['products']);
  }
}
