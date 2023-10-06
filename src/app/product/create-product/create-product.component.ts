import {Component, Inject} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../Model/product";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  private product!: Product;
  private products = [];
  private submitted: boolean = false;

  constructor(private productService: ProductService, private productForm: FormGroup,
              public dialogRef: MatDialogRef<CreateProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  router: Router) {
  }
  ngOnInit(): void{
    //this.product = new Product();
      this.productService.getProductList().subscribe(products =>
          this.products = products);
  }

  newProduct(): void{
    this.submitted = false;
    this.product = new Product();
  }

  save(){
    this.productForm = new FormGroup({
      name : new FormControl(),
      productId : new FormControl(),
      description : new FormControl(),
      vendorEmail: new FormControl()
    });

    this.product = this.productForm.value;
    this.productService.createProduct(this.product);
  }

  onSubmit(){
    this.submitted = true;
    this.save();
    this.onClose()
  }

  private onClose() {
    this.dialogRef.close();
  }

  gotoList(){
    this.router.navigate(['/product-list']);//.then();
  }
}
