import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule,} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";



@NgModule({
  declarations: [
    CreateProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    ProductListComponent,
    ProductDetailsComponent
  ],
    exports: [
        CreateProductComponent,
        ProductListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        FormsModule,
        MatSelectModule,
        MatDatepickerModule,
      MatDatepickerModule,
      MatButtonModule,
      MatFormFieldModule,
      MatNativeDateModule
    ]
})
export class ProductModule { }
