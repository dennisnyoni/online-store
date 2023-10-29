import {Component, Inject} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../Model/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Vendor} from "../../Model/vendor";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  display: FormControl = new FormControl("", Validators.required);

   product!: Product;
   products = [];
   submitted: boolean = false;
   name!: string;
   //productId!: bigint;
   unitPrice!: number;
   category!: string;
   image!: File ;
   file_store!:FileList;
  productForm!: FormGroup;
  productFormData!: FormData;
  id: any;


  constructor(private productService: ProductService, private authService: AuthService,private errorService: ErrorService,
              public dialogRef: MatDialogRef<CreateProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  router: Router) {
  }
  ngOnInit(): void{
    //this.images = [];
    this.product = new Product();
    this.productFormData = new FormData();
    //  this.productService.getProductList().subscribe(products =>
     //     this.products = products);
    this.productForm = new FormGroup({
      productName : new FormControl('',Validators.required),
      unitPrice : new FormControl( '',Validators.required),
      category : new FormControl('',Validators.required),
      availableQuantity: new FormControl('',[Validators.required]),
      productType : new FormControl('',Validators.required),
      description : new FormControl('',Validators.required),

    });

  }
  get imageFile(){
    return this.productForm.controls;
  }
  newProduct(): void{
    this.submitted = false;
    this.product = new Product();
  }

  save(){


    //this.product = this.productForm.value;
    alert(this.product);
    console.log("value :"+this.product);
    //this.productService.createProduct(this.);
  }

  onSubmit(data: any){
    console.log('current user role :',this.authService.decodeJwtToken(this.authService.getToken()).role);
    this.product = this.productForm.value;

    this.product.image = this.image;
    this.product.status = "In Stock";
    this.product.userId = this.authService.decodeJwtToken(this.authService.getToken()).userId;

    console.log('product images when done :',this.product.image);
    this.productFormData.append('product', JSON.stringify(this.product));

    //console.log('FormData:',this.productFormData);
    this.productFormData.forEach((value: any, key: any) => {
      console.log(key, value);
    });
    let response='';
    this.productService.createProduct(this.productFormData).subscribe(
      data => this.productService.showMessage('Product added successfully!'),//alert(data),
      (error: HttpErrorResponse) => alert(this.errorService.getErrorMessage(error.status))
    );

  }
  onClose() {
    this.dialogRef.close();
    this.gotoList();
  }

  gotoList(){
    this.router.navigate(['products']);
  }

  onFileSelected(event: any) {
    this.image = event.target.files;
  }
}
