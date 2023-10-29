import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {User} from "../../Model/user";
import {ErrorService} from "../../services/error.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  id!: number;
  user: any;
  constructor(
    private route: ActivatedRoute,private router: Router, private errorService: ErrorService,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = new User();
    this.id = this.data.id;

    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data);
        this.user = data;
      }, (error: HttpErrorResponse ) => this.errorService.getErrorMessage(error.status));
  }

  list() {
    this.dialogRef.close();
    this.router.navigate(['users']);
  }


}
