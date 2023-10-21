import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
//import {StripeCardComponent, StripeService} from "ngx-stripe";
//import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//import { StripeService, Elements, Element } from 'ngx-stripe'; // Import Element instead of StripeElement
import {StripeService, StripeCardComponent, StripePaymentElementComponent} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {PaymentIntent} from "../../Model/payment-intent";
import {environment} from "../../../../environment";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {OrderService} from "../../services/order.service";
import {Order} from "../../Model/order";


//declare var StripeCheckoutStatic;
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  @ViewChild(StripeCardComponent)
  cardElement!: StripeCardComponent;
  paying = false;
  elementOptions!: StripeElementsOptions;
  amount!: number;


  public cardOptions:StripeCardElementOptions = {
    style:{
      base:{
        fontWeight: 400,
        fontFamily: 'Circular',
        fontSize: '14px',
        iconColor: '#666EE8',
        color: '#002333',
        '::placeholder':{
          color: '#919191',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };
  constructor(private http: HttpClient, private fb: FormBuilder, private stripeService: StripeService, private shoppingCartService: ShoppingCartService,
              private orderService: OrderService) {
  }
  paymentForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      street: ['',[Validators.required]],
      city: ['',[Validators.required]],
      state: ['',[Validators.required]],
      zipcode: ['',[Validators.required, Validators.pattern(/^\d{5}$/)]],
      //amount: [100, [Validators.required, Validators.pattern(/d+/)]]
    });
  payment_method: any;

  ngOnInit(): void {
    this.amount = this.shoppingCartService.calculateTotal();
    console.log('shopping cart total: ',this.amount);
    this.createPaymentIntent(this.amount)
      .subscribe(pi => {
        this.elementsOptions.clientSecret = pi.client_secret;

      });
  }

  pay(){
    console.log('elementsoptions :', this.cardOptions)
    if(this.paymentForm.valid){
      this.paying = true;
      this.stripeService.confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data:{
            billing_details:{
              name: this.paymentForm.get('name')?.value,
              email: this.paymentForm.get('email')?.value,
              address: {
                line1: this.paymentForm.get('street')?.value || '',
                postal_code: this.paymentForm.get('zipcode')?.value || '',
                city: this.paymentForm.get('city')?.value || '',
              }
            }
          }
        },
        redirect: 'if_required'
      }).subscribe((result) => {
        this.paying = false;
        console.log('Result', result);
        if(result.error){
          alert(result.error.message);
        }else{
          if(result.paymentIntent.status === 'succeeded'){
            alert({success: true});

            this.orderService.createOrder(new Order());

          }
        }
      });
    }else {
      console.log(this.paymentForm)
    }
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${environment.paymentApiUrl}/create-payment-intent`,{amount}
      //`${env.apiUrl}/create-payment-intent`,{amount}
    );

  }

}
