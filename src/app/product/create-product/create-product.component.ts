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
   images!: Array<File> ;
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
      description : new FormControl('',Validators.required)

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
    //let formData = new FormData();
    //this.images = [];

    this.product = this.productForm.value;
    this.product.images = this.images;
        // @ts-ignore
    //this.product.vendorId = this.authService.getToken().split('.')[3];
    this.product.status = "In Stock";


    // for(let i=0;i<this.images.length;i++){
    //   this.productFormData.append("files", this.file_store[i],this.file_store[i].name);
    //   //this.product.images = this.images.push(this.file_store[i]);
    //   //this.images.push(this.file_store[i].name)
    //   console.log('this.file_store[i] : ',this.file_store[i]);
    // }
    this.productFormData.append('product', JSON.stringify(this.product));

    //console.log('FormData:',this.productFormData);
    this.productFormData.forEach((value: any, key: any) => {
      console.log(key, value);
    });
    this.productService.createProduct(this.productFormData);
  }


  private onClose() {
    this.dialogRef.close();
  }

  gotoList(){
    this.router.navigate(['/product-list']);//.then();
  }

  onFileChange(list:any) {
    this.file_store = list;
    if(list.length){
      const file = list[0];
      const count = list.length > 1?`(+${list.length-1} files)`:"";
      this.display.patchValue(`${file.name}${count}`);
      console.log(list);
      for(let i=0;i<this.images.length;i++){
        this.productFormData.append("images", this.file_store[i],this.file_store[i].name);
        //this.product.images = this.images.push(this.file_store[i]);
        //this.images.push(this.file_store[i].name)
        //console.log('this.file_store[i] : ',this.file_store[i].arrayBuffer());
        this.images.push(this.file_store[i]);
      }
    }else{
      this.display.patchValue("");
    }
  }
}
