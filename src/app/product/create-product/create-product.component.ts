import {Component, Inject} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product, ShipIn, ShipOut} from "../../Model/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Vendor} from "../../Model/vendor";
import {AuthService} from "../../services/auth.service";

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
   images: File[] =[];
   file_store!:FileList;
  productForm!: FormGroup;
  productFormData!: FormData;

  constructor(private productService: ProductService, private authService: AuthService,
              public dialogRef: MatDialogRef<CreateProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  router: Router) {
  }
  ngOnInit(): void{
    this.images = [];
    this.product = new Product();
    this.productFormData = new FormData();
    //  this.productService.getProductList().subscribe(products =>
     //     this.products = products);
    this.productForm = new FormGroup({
      productName : new FormControl('',Validators.required),
      unitPrice : new FormControl( '',Validators.required),
      category : new FormControl('',Validators.required),
      image : new FormControl('',Validators.required),
      imageSource: new FormControl('',[Validators.required]),
      availableQuantity: new FormControl('',[Validators.required]),
      productType : new FormControl('',Validators.required),
      description : new FormControl('',Validators.required),
      images : new FormControl('',Validators.required),

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


    this.product = this.productForm.value;
    // Append all selected files to the FormData
    // for (const file of this.images) {
    //   this.productFormData.append('productImages', file, file.name);
    // }

    this.product.images = this.images;
    this.product.status = "In Stock";
    this.product.vendorId = this.authService.decodeJwtToken(this.authService.getToken()).vendorId;

    console.log('product images when done :',this.product.images);
    this.productFormData.append('product', JSON.stringify(this.product));

    //console.log('FormData:',this.productFormData);
    this.productFormData.forEach((value: any, key: any) => {
      console.log(key, value);
    });
    let response='';
    this.productService.createProduct(this.productFormData).subscribe(
      data => alert(data),
      error => alert(error)
    );
  }


  private onClose() {
    this.dialogRef.close();
  }

  gotoList(){
    this.router.navigate(['/products']);//.then();
  }

  onFileSelected(event: any) {
    this.images = event.target.files;
  }
}
