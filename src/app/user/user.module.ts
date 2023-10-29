import { NgModule } from '@angular/core';
import {CommonModule, NgClass, NgIf} from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";



@NgModule({
  declarations: [
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    UserListComponent,
    UserDetailsComponent
  ],
    imports: [
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        NgClass,
        MatIconModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        MatButtonModule,
        NgIf,
        MatDatepickerModule


    ]
})
export class UserModule { }
