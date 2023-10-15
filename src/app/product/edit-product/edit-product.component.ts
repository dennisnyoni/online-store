import {Component, Inject, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Product} from "../../Model/product";
import {ProductService} from "../../services/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

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


  constructor(private productService: ProductService,
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
        }, error => console.log(error));
  }

  newPaymentDetails(): void {
    this.submitted = false;
    this.product = new Product();
  }

  save() {

    this.productService.updateProduct(this.id, this.product)
        .subscribe(data => alert('Successfully updated!'),
                error => alert('Data post error! Record could not be '+
            'saved.'));
    this.product = new Product();
    //this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    // this.onClose();
  }

  onClose(){
    this.dialogRef.close();
  }

  gotoList() {
    this.router.navigate(['/product-details']);
  }

}
