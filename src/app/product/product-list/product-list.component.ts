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
import {CreateShipInComponent} from "../../ship-in/create-ship-in/create-ship-in.component";
import {CookieService} from "ngx-cookie-service";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  itemQuantity: number=0;
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
              public dialog: MatDialog, private router: Router, private cookieService: CookieService, private orderService:OrderService) {
    console.log('role is HasNoRole ',this.hasNoRole());
    console.log('role is Vendor ',this.isVendor());
    console.log('role is Customer ',this.isCustomer());
    console.log('role is Admin ',this.isAdmin());

  }

  ngOnInit(): void {
    this.reloadData();
      // if role is VENDOR, fetch only products that belong to the particular vendor logged in
     if(this.authService.decodeJwtToken(this.authService.getToken()).role=='VENDOR') {

      this.productService.getProductList().subscribe(products => this.products = products);
      this.products =  this.products.filter(item => item.userId === this.authService.decodeJwtToken(this.authService.getToken()).userId);
      console.log('Filtered products for vendor with vendor Id :',this.authService.decodeJwtToken(this.authService.getToken()).userId);
    }else{
       this.productService.getProductList().subscribe(products => this.products = products);
     }

     console.log('items in product list: ',this.products.length)
     if(this.products.length==0){
       this.product = new Product();
       this.product.productId = 3233;
       this.product.productPrice = 2344.98;
       this.product.userId ='rey@gmail.com';
        this.product.status='available';
       this.products.push(this.product);

     }
      console.log('product list has items :',this.products.length);
  }
  addToCart(productId: number): void {
    this.cartService.decrementItemQuantity(productId);
   this.cartService.sendCookieToBackend();
    this.cartService.showMessage("there are "+this.itemQuantity+" items in the cart");

  }

  itemsInCart(): number{
    let totalNumItems: number=0;
    for(let item of this.cartService.cartItems){
      totalNumItems +=item.quantity;
    }
    return totalNumItems;
  }

  incrementQuantity(productId: number) {

    this.itemQuantity  = this.cart.get(productId) || 1;
    this.cartService.updateItemQuantity(productId, this.itemQuantity + 1);
    console.log('product id: '+productId+' current quantity :'+ this.itemQuantity);
    this.cartService.showMessage("added 1 item to cart");
  }

  decrementQuantity(productId: number) {

    this.itemQuantity= this.cart.get(productId) || 0;
    if (this.itemQuantity > 0) {
      this.cartService.updateItemQuantity(productId, this.itemQuantity - 1);
      console.log('product id: '+productId+' current quantity :'+ this.itemQuantity);
      this.cartService.showMessage("removed 1 item from cart");
    }

  }


  get cart(): Map<number, number> {
    return this.cartService.getCart();
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
                //this.listData = new MatTableDataSource(this.products);
                this.listData = new MatTableDataSource(array);
                this.listData.filter = this.authService.decodeJwtToken(this.authService.getToken()).userId;
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

     // this.router.navigate(['add-product']);
    }

  createShipin(): void {

    let dialogRef = this.dialog.open(CreateShipInComponent, {
      height: '350px',
      width: '700px',
    });

    //this.router.navigate(['ship-in']);
  }
  onCreateShipin(id:number): void {

    let dialogRef = this.dialog.open(CreateShipInComponent, {
      height: '350px',
      width: '700px',
      data: {
        id: id,
      }
    });

    //this.router.navigate(['ship-in']);
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

       // this.router.navigate(['products', id]);
    }

    onEdit(id: number) {

        let dialogRef = this.dialog.open(EditProductComponent, {
            height: '750px',
            data: {
                id: id,
            }
        });
       //this.router.navigate(['products', id]);
    }

  searchProducts() {
    console.log('starting to search ...')
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

    console.log('filter criteria: ',filterCriteria.price );
    // Use the product service to search products based on the selected criteria
    this.productService.searchProducts(filterCriteria)
      .subscribe( (results) => {

      // Handle the search results, e.g., update a product list in the UI
      this.products = results;
    });

    this
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


  calculateTotal(): number {

    return this.cartService.calculateTotal();
  }


  checkout(): void {
    // Implement the checkout logic, e.g., navigate to a checkout page
    this.router.navigate(['check-out']);
  }


  enableSearchProducts() {

      this.enableSearch = true;

  }

  disableSearchProducts() {

      this.enableSearch = false

  }


  gotoShoppingCart() {
    this.router.navigate(['shopping-cart']);
  }
}

