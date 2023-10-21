import {Component, ViewChild} from '@angular/core';
import {Product} from "../../Model/product";
import {ProductService} from "../../services/product.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CreateProductComponent} from "../create-product/create-product.component";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  noRole:boolean = true;
  role!: string
  productName: string = '';
  category: string = '';
  price: number=0;
  enableSearch: boolean=false;
  productType: string = '';
  vendor: any;
    searchKey!: string;

    listData!: MatTableDataSource<any>;
    imageUrl = 'assets/image2.jpeg'
    products:Product[]=[];
    vendorProducts: Product[]=[];
    product!:Product;
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;



  displayedColumns: string[] = ['product_id', 'product_name', 'date_added', 'unit_price','status', 'Actions'];


  constructor(private productService: ProductService, private cartService: ShoppingCartService, private authService: AuthService,
              public dialog: MatDialog, private router: Router) {
    console.log('role is HasNoRole ',this.hasNoRole());
    console.log('role is Vendor ',this.isVendor());
    console.log('role is Customer ',this.isCustomer());
    console.log('role is Admin ',this.isAdmin());

  }

  ngOnInit(): void {
    this.reloadData();
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
                this.listData.filter = this.authService.decodeJwtToken(this.authService.getToken()).vendorId;
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
            height: '550px',
          width: '700px',
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
        this.router.navigate(['edit-product', id]);
    }

  searchProducts() {
    // Create an object to represent the filter criteria
    const filterCriteria: any = {};

    // Populate the filterCriteria object with selected filter options
    if (this.productName) {
      filterCriteria.productName = this.productName;
    }
    if (this.category) {
      filterCriteria.category = this.category;
    }
    if (this.price) {
      filterCriteria.price = this.price;
    }

    if (this.productType) {
      filterCriteria.productType = this.productType;
    }

    // Use the product service to search products based on the selected criteria
    this.productService.searchProducts(filterCriteria)
      .subscribe( (results) => {

      // Handle the search results, e.g., update a product list in the UI
      this.products = results;
    });
  }

  hasNoRole(){
    return this.authService.hasNoRole();
  }

  isCustomer(): boolean {
    return this.authService.isCustomer();

  }

  isVendor(): boolean {

    return this.authService.isVendor();

  }

  isAdmin(): boolean {
    return  this.authService.isAdmin();
  }

}
