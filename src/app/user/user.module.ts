import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';



@NgModule({
  declarations: [
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
