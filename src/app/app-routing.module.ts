import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {CreateProductComponent} from "./product/create-product/create-product.component";
import {EditProductComponent} from "./product/edit-product/edit-product.component";
import {ProductDetailsComponent} from "./product/product-details/product-details.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart/shopping-cart.component";
import {MakePaymentComponent} from "./payment/make-payment/make-payment.component";
import {HomeComponent} from "./home/home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'add-product', component: CreateProductComponent,  canActivate: [AuthGuardService], data: { expectedRoles: ['VENDOR'] }}, //canActivate: [AuthGuard]},
    {path: 'edit-product', component: EditProductComponent, canActivate: [AuthGuardService], data: { expectedRoles: ['VENDOR', 'ADMIN'] }}, //canActivate: [AuthGuard]},
    {path: 'product-details', component: ProductDetailsComponent},
    {path: 'shopping-cart', component: ShoppingCartComponent},
    {path: 'make-payment', component: MakePaymentComponent},
   // { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
]

@NgModule({
    //declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
