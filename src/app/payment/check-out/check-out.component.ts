import {Component, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {StripeService} from "ngx-stripe";

//declare var StripeCheckoutStatic;
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  constructor(private http: HttpClient, private stripeService: StripeService) {
  }
checkout(){

}

}
