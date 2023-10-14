
import { CommonModule } from '@angular/common';

import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import { RegisterComponent } from './register/register.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [

    RegisterComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,

    ]
})
export class RegisterModule { }
