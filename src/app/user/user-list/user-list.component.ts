import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {CreateProductComponent} from "../../product/create-product/create-product.component";
import {UserService} from "../../services/user.service";
import {User} from "../../Model/user";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {CreateUserComponent} from "../create-user/create-user.component";
import {Address} from "../../Model/address";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {


  enableSearch: boolean=false;
  vendor: any;
  searchKey!: string;

  listData!: MatTableDataSource<any>;
  users:User[]=[];
  user!:User;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;



  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'Actions'];


  constructor(private userService: UserService,
              public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {

    this.reloadData();
    // Fetch the list of users from the UserService when the component initializes
    this.userService.getUserList().subscribe(users => this.users = users);
    console.log(this.users.length+(" users"))

 console.log('users :',this.users[0]);
  }

  reloadData() {
    this.userService.getUserList().subscribe(list => this.users=list);
    this.userService.getUserList().subscribe(
      list => {
        const array = list.map((item: { userId: any; }) => {
          return {
            $id: item.userId,
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

    let dialogRef = this.dialog.open(CreateUserComponent, {
      height: '580px',
      width: '750px',
    });
    this.router.navigate(['create-user']);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  userDetails(id: number) {
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      height: '450px',
      width: '500px',
      data: {
        id: id,
      }
    });

    this.router.navigate(['user-details', id]);
  }

  onEdit(id: number) {

    let dialogRef = this.dialog.open(EditUserComponent, {
      height: '750px',
      data: {
        id: id,
      }
    });
    this.router.navigate(['edit-user', id]);
  }


}
