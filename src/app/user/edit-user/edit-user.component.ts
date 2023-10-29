import {Component, Inject, Input} from '@angular/core';
import {Product} from "../../Model/product";
import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";
import {ErrorService} from "../../services/error.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../Model/user";
import {UserService} from "../../services/user.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  id!: number;
  user!: User;
  @Input() public productData: any;
  submitted = false;

  constructor(private userService: UserService,private authService: AuthService, private errorService: ErrorService,
              public dialogRef: MatDialogRef<EditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) { }

  ngOnInit() {

    this.id = this.data.id;// this.route.snapshot.params['id'];
    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data);
        this.user = data;
      }, (error:HttpErrorResponse) => this.errorService.getErrorMessage(error.status));
  }

  newPaymentDetails(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {

    this.userService.updateUser(this.id, this.user)
      .subscribe(data => this.userService.showMessage('User was successfully updated!'),
        (error:HttpErrorResponse) => this.errorService.getErrorMessage(error.status));
    this.user = new User();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    this.onClose();
  }

  onClose(){
    this.dialogRef.close();
  }

  gotoList() {
    this.router.navigate(['users']);
  }

  onFileSelected(event: Event) {

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
