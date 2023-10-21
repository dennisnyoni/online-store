import {Component, Inject} from '@angular/core';
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
export class ProductDetailsComponent {
  id!: number;
  currentIndex: number = 0;
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
    this.route.paramMap.subscribe((params) => {
      // Get the product ID from the route parameter
      //this.id = params.get('id');

      // Fetch the product details by ID from the ProductService
      this.product = this.productService.getProductById(this.id);
      console.log('product id :'+this.id)
    });
  }

  addToCart(product: any): void {
    // Add the selected product to the cart
    this.cartService.addToCart(product);
  }

  list() {
    this.dialogRef.close();
     this.router.navigate(['products']);
  }

  previousImage() {
    if(this.currentIndex>0){
      this.currentIndex--;
      this.loadCurrentImage(this.currentIndex);
    }
  }

  nextImage() {
    if(this.currentIndex<this.product.images.length - 1){
      this.currentIndex++;
      this.loadCurrentImage(this.currentIndex);
    }

  }

  loadCurrentImage(index: number) {
    // Fetch the image file from the server based on this.images[this.currentIndex]
    this.currentImage=this.product.images[index];
  }
}
