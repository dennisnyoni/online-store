import {Component, ViewChild} from '@angular/core';
import {Product} from "../../Model/product";
import {ProductService} from "../../services/product.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Observable} from "rxjs";
import {Vendor} from "../../Model/vendor";
import {Address} from "../../Model/address";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CreateProductComponent} from "../create-product/create-product.component";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {EditProductComponent} from "../edit-product/edit-product.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

    searchKey!: string;
    listData!: MatTableDataSource<any>;
    imageUrl = 'assets/image2.jpeg'
    products:Product[]=[];
    product!:Product;
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private productService: ProductService, private cartService: ShoppingCartService,
              public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
      // Fetch the list of products from the ProductService when the component initializes
      this.productService.getProductList().subscribe(products => this.products = products);
      this.product = new Product();
      if (this.products.length ==0) {

          this.product.productId = 10000000200;
          this.product.unitPrice = 1093.97;
          this.product.name = 'laptop';
          this.product.category = 1;
          this.product.images = [];
          this.product.description = 'Core i7 1TB 64GB RAM';
          this.product.isApproved = true;
      }
      this.products.push(this.product);
      console.log(this.products.length);
  }
  addToCart(product: any): void {
    // Add the selected product to the cart
    this.cartService.addToCart(product);
    console.log(this.cartService.getCartItems());
  }

    gotoProductDetails() {
    alert('Opening product details');
    }

    reloadData() {
        this.productService.getProductList().subscribe(list => this.products=list);
        this.productService.getProductList().subscribe(
            list => {
                const array = list.map((item: { productId: any; }) => {
                    return {
                        $id: item.productId,
                        ...item
                    };
                });
                //this.listData = new MatTableDataSource(array);
                this.listData = new MatTableDataSource(array);
                this.listData.sort = this.sort;
                this.listData.paginator = this.paginator;
            });

    }

    onSearchClear() {
        this.searchKey = "";
        this.applyFilter();
    }

    applyFilter() {
        this.listData.filter = this.searchKey.trim().toLowerCase();
    }

    onCreate(): void {

        let dialogRef = this.dialog.open(CreateProductComponent, {
            height: '750px',
        });

    }

    deleteProduct(id: number) {
        this.productService.deleteProduct(id)
            .subscribe(
                data => {
                    console.log(data);
                    this.reloadData();
                },
                error => console.log(error));
    }

    productDetails(id: number) {
        let dialogRef = this.dialog.open(ProductDetailsComponent, {
            height: '450px',
            width: '500px',
            data: {
                id: id,
            }
        });

        //this.router.navigate(['product-details', id]);
    }

    onEdit(id: number) {

        let dialogRef = this.dialog.open(EditProductComponent, {
            height: '750px',
            data: {
                id: id,
            }
        });
        //this.router.navigate(['edit-product', id]);
    }

}
