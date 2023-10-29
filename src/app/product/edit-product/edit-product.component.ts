import {Component, Inject, Input} from '@angular/core';
import {Product} from "../../Model/product";
import {ProductService} from "../../services/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  id!: number;
  product: Product = new Product();
  @Input() public productData: any;
  submitted = false;


  constructor(private productService: ProductService,private authService: AuthService, private errorService: ErrorService,
              public dialogRef: MatDialogRef<EditProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) { }

  ngOnInit() {

    this.product = new Product();
    this.id = this.data.id;// this.route.snapshot.params['id'];
    this.productService.getProductById(this.id)
        .subscribe(data => {
          console.log(data);

          this.product = data;
        }, (error:HttpErrorResponse) => this.errorService.getErrorMessage(error.status));
  }

  newPaymentDetails(): void {
    this.submitted = false;
    this.product = new Product();
  }

  save() {

    this.productService.updateProduct(this.id, this.product)
        .subscribe(data => this.productService.showMessage('Product was successfully updated!'),
          (error:HttpErrorResponse) => this.errorService.getErrorMessage(error.status));
    this.product = new Product();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
     this.onClose();
  }

  approve() {
    this.product.isApproved=true;
    this.productService.updateProduct(this.id, this.product)
      .subscribe(data => this.productService.showMessage('Successfully updated!'),
        (error:HttpErrorResponse) => this.errorService.getErrorMessage(error.status));
    this.product = new Product();
    this.gotoList();
  }

  onClose(){
    this.dialogRef.close();
  }

  gotoList() {
    this.router.navigate(['products']);
  }

  onFileSelected(event: Event) {

  }

  hasNoRole(){
    return this.authService.hasNoRole();
  }

  isCustomer(): boolean {
    return this.authService.isCustomer();

  }

  isVendor(): boolean {

    return this.authService.isVendor();

  }

  isAdmin(): boolean {
    return  this.authService.isAdmin();
  }


}
