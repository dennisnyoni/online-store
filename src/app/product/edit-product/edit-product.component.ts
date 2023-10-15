import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
//import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  registerForm!: FormGroup;

  ngOnInit(){
    this.registerForm = new FormGroup<any>({
      'firstname':new FormControl(''),
      'lastname':new FormControl(''),
      'email': new FormControl(''),
      'phone': new FormControl(''),
      'password': new FormControl(''),
      'password2': new FormControl(''),
      'role': new FormControl(''),
      'street': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'zipcode': new FormControl(''),
    });
  }
  onSubmit(value: any) {

  }
}
