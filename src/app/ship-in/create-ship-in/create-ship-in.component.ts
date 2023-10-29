import {Component, Inject, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../Model/product";

import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ShipInService} from "../../services/ship-in.service";
import {ShipIn} from "../../Model/ship-in";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-create-ship-in',
  templateUrl: './create-ship-in.component.html',
  styleUrls: ['./create-ship-in.component.css']
})
export class CreateShipInComponent {

  id!:number;
  product!: Product;
  shipIn!: ShipIn;
  products: Product[] = [];
  vendorProducts:Product[] = [];
  submitted: boolean = false;
  name!: string;
  shipInForm!: FormGroup;
  productFormData!: FormData;

  constructor(private productService: ProductService, private shipInService: ShipInService,private authService: AuthService, private errorService: ErrorService,
              public dialogRef: MatDialogRef<CreateShipInComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  router: Router) {
  }
  ngOnInit(): void{
    console.log('ship-in date :', new Date());
    this.product = new Product();
    this.id = this.data.id;

    this.productService.getProductById(this.id)
      .subscribe(data => {
        console.log(data);

        this.product = data;
      }, (error: HttpErrorResponse) => alert(this.errorService.getErrorMessage(error.status)));
      this.shipInForm = new FormGroup({
      quantity : new FormControl('',Validators.required),

    });

  }

  newShipIn(): void{
    this.submitted = false;
    this.product = new Product();
  }

  onSubmit(data: any){
    this.shipIn = new ShipIn();
    console.log('current user role :',this.authService.decodeJwtToken(this.authService.getToken()).role);
    this.shipIn.product = this.product;
    this.shipIn.quantity = this.shipInForm.get('quantity')?.value;
    this.shipIn.shipmentDate = new Date();

    this.shipInService.createShipIn(this.shipIn).subscribe(
      data => this.shipInService.showMessage('Ship-in successfully added'),
      (error: HttpErrorResponse) => alert(this.errorService.getErrorMessage(error.status))
    );
  }

  private onClose() {
    this.dialogRef.close();
  }

  gotoList(){
    this.router.navigate(['ship-ins']);//.then();
  }


}
