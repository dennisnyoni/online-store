import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import {StripeCardNumberComponent, StripePaymentElementComponent, StripeService} from "ngx-stripe";
import { StripeCardElementOptions,
         StripeElementsOptions
        } from '@stripe/stripe-js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {PaymentIntent} from "../../Model/payment-intent";
import {environment} from "../../../../environment";
//import Promise from "$GLOBAL$";
//import {error} from "@angular/compiler-cli/src/transformers/util";
//import document from "$GLOBAL$";

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit{

  @ViewChild('cardElement') cardElement!: ElementRef;

  stripe!: Stripe;
  elements!: StripeElements;
/*
  constructor() {}

  ngAfterViewInit(): void {
    // Initialize Stripe and Elements
    this.initializeStripe();
  }

  initializeStripe(): void {
    // Create a Stripe instance
    // @ts-ignore
    this.stripe = Stripe(environment.stripe.publicKey); // Replace with your Stripe publishable key

    // Create an instance of Elements
    this.elements = this.stripe.elements();

    // Create and mount the Card Element
    const card = this.elements.create('card');
    card.mount(this.cardElement.nativeElement);
  }

  async processPayment(): Promise<void> {
    const { token, error } = await this.stripe.createToken(this.cardElement.nativeElement);

    if (error) {
      alert(error.message)
      // Display error to the user
      const errorElement = document.getElementById('card-errors');

      //errorElement.textContent = error.message;


    } else {
      // Send the token to your server for payment processing
      this.sendTokenToServer(token.id);
    }
  }

  sendTokenToServer(token: string): void {
    // Send the token to your backend for payment processing
    // You should implement this part to interact with your backend
    // Include the token ID and payment amount in the request
  }

  ngOnInit(): void {
  }

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
  };*/
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  paying = false;
  elementOptions!: StripeElementsOptions;

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
  constructor(private http: HttpClient, private fb: FormBuilder, private stripeService: StripeService) {
  }
  paymentForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      address: [''],
      zipcode: [''],
      amount: [100, [Validators.required, Validators.pattern(/d+/)]]
    });
  payment_method: any;

  ngOnInit(): void {
    this.createPaymentIntent(this.paymentForm.get('amount')?.value)
      .subscribe(pi => {
        this.elementsOptions.clientSecret = pi.client_secret;
      });
  }

  pay(){
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
                    line1: this.paymentForm.get('address')?.value || '',
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
