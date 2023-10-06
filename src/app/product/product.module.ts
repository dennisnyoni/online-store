import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';



@NgModule({
  declarations: [
    CreateProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
