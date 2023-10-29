import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {OrderService} from "../../services/order.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Order} from "../../Model/order";
import {OrderDetailsComponent} from "../order-details/order-details.component";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

  listData!: MatTableDataSource<any>;
  orders:Order[]=[];
  customerOrders: Order[]=[];
  order!:Order;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;



  displayedColumns: string[] = ['order_id', 'order_date', 'payment_status', 'total_quantity','order_number', 'Actions'];
  searchKey: any;


  constructor(private orderService: OrderService, private authService: AuthService,
              public dialog: MatDialog, private router: Router) {
    console.log('role is HasNoRole ',this.hasNoRole());
    console.log('role is Vendor ',this.isVendor());
    console.log('role is Customer ',this.isCustomer());
    console.log('role is Admin ',this.isAdmin());

  }

  ngOnInit(): void {
    this.reloadData();
    // if role is VENDOR, fetch only products that belong to the particular vendor logged in
    if(this.authService.getUserRole()=='VENDOR'|| this.authService.hasNoRole()) {

      this.orderService.getOrderList().subscribe(orders => this.orders = orders);
      this.customerOrders =  this.orders.filter(item => item.userEmail === this.authService.decodeJwtToken(this.authService.getToken()).email);
      console.log('Filtered orders  :',this.authService.decodeJwtToken(this.authService.getToken()).email);
    }else{
      this.orderService.getOrderList().subscribe(orders => this.orders = orders);
    }


    console.log(this.orders.length);
  }

  gotoOrderDetails() {
    alert('Opening product details');
  }

  reloadData() {

    this.orderService.getOrderList().subscribe(list => this.orders=list);
    this.orderService.getOrderList().subscribe(
      list => {
        const array = list.map((item: { orderId: any; }) => {
          return {
            $id: item.orderId,
            ...item
          };
        });
        //this.listData = new MatTableDataSource(array);
        this.listData = new MatTableDataSource(array);
        this.listData.filter = this.authService.decodeJwtToken(this.authService.getToken());
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

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id)
      .subscribe(
          (data: any) => {
          console.log(data);
          this.reloadData();
        },
          (error: any) => console.log(error));
  }

  orderDetails(id: number) {
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      height: '450px',
      width: '500px',
      data: {
        id: id,
      }
    });

    this.router.navigate(['orders', id]);
  }

  // onEdit(id: number) {
  //
  //   let dialogRef = this.dialog.open(EditOrderComponent, {
  //     height: '750px',
  //     data: {
  //       id: id,
  //     }
  //   });
  //   // this.router.navigate(['orders', id]);
  // }


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
