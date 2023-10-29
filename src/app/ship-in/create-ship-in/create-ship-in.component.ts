import {Component, Inject, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../Model/product";

import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ShipInService} from "../../services/ship-in.service";
import {ShipIn} from "../../Model/ship-in";

@Component({
  selector: 'app-create-ship-in',
  templateUrl: './create-ship-in.component.html',
  styleUrls: ['./create-ship-in.component.css']
})
export class CreateShipInComponent {


  product!: Product;
  shipIn!: ShipIn;
  products: Product[] = [];
  vendorProducts:Product[] = [];
  submitted: boolean = false;
  name!: string;
  shipInForm!: FormGroup;
  productFormData!: FormData;
  shipInEventType!:string;

  constructor(private productService: ProductService, private shipInService: ShipInService,private authService: AuthService,
              public dialogRef: MatDialogRef<CreateShipInComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  router: Router) {
  }
  ngOnInit(): void{
    //this.images = [];
    this.product = new Product();
    this.productFormData = new FormData();
      this.productService.getProductList().subscribe(products =>
         this.products = products);
      this.vendorProducts = this.products.filter(product =>product.userId = this.authService.decodeJwtToken(this.authService.getToken()).userId);

      this.shipInForm = new FormGroup({

      productId : new FormControl( '',Validators.required),
      quantity : new FormControl('',Validators.required),
      //shipEventType: new FormControl('',Validators.required),

    });

  }

  newShipIn(): void{
    this.submitted = false;
    this.product = new Product();
  }



  onSubmit(data: any){
    console.log('current user role :',this.authService.decodeJwtToken(this.authService.getToken()).role);

    for(let product of this.vendorProducts){
      if(product.productId == this.shipInForm.get('productId')?.value){
        this.product = product;
        this.shipIn.product = this.product;
      }
    }

    let response='';
    //this.shipIn.shipInEventType = this.shipInForm.value.shipInEventType;//.get('shipInEventType')?.value;
    //this.shipIn.quantity = this.shipInForm.get('quantity')?.value;
    this.shipIn.quantity = this.shipInForm.get('quantity')?.value;

    this.shipIn.shipmentDate = new Date();
    this.shipInService.createShipIn(this.shipIn).subscribe(
      data => console.log(data),
      error => alert(error)
    );
  }


  private onClose() {
    this.dialogRef.close();
  }

  gotoList(){
    this.router.navigate(['/shipins']);//.then();
  }


}
