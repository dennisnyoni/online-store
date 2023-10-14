import {Component, Inject} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../Model/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Vendor} from "../../Model/vendor";

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
   images: Array<string> = [];
   file_store!:FileList;
  productForm!: FormGroup;

  constructor(private productService: ProductService,
              public dialogRef: MatDialogRef<CreateProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  router: Router) {
  }
  ngOnInit(): void{
    this.product = new Product();
    //  this.productService.getProductList().subscribe(products =>
     //     this.products = products);
    this.productForm = new FormGroup({
      name : new FormControl('',Validators.required),
      unitPrice : new FormControl( '',Validators.required),
      category : new FormControl('',Validators.required),
      image : new FormControl('',Validators.required),
      imageSource: new FormControl('',[Validators.required]),
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
    //this.productService.createProduct(this.product);
  }

  onSubmit(data: any){
    let formData = new FormData();
    this.images = [];
    for(let i=0;i<this.images.length;i++){
      formData.append("files", this.file_store[i],this.file_store[i].name);
      this.images.push(this.file_store[i].name)
    }
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
    }else{
      this.display.patchValue("");
    }
  }
}
