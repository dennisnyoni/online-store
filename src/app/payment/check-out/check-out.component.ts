import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StripeService, StripeCardComponent, StripePaymentElementComponent} from 'ngx-stripe';
import {
  Stripe,
  StripeCardElementOptions, StripeElements,
  StripeElementsOptions
} from '@stripe/stripe-js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {PaymentIntent} from "../../Model/payment-intent";
import {environment} from "../../../../environment";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';



//declare var StripeCheckoutStatic;
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements AfterViewInit{

  @ViewChild('paymentElement') paymentElement!: ElementRef;

  stripe!: Stripe;
  elements!: StripeElements;

  @ViewChild(StripeCardComponent)
  cardElement!: StripeCardComponent;
  paying = false;
  elementOptions: StripeElementsOptions={
    clientSecret: environment.stripe.testKey
  };
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
              private orderService: OrderService, private router: Router) {
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

    //this.elementsOptions.clientSecret = environment.stripe.testKey;
    this.amount = this.shoppingCartService.calculateTotal();
    console.log('shopping cart total: ',this.amount);
    this.createPaymentIntent(this.amount)
      .subscribe(pi => {
        this.elementsOptions.clientSecret = pi.client_secret;

      });
  }

  ngAfterViewInit(): void {
    //this.stripe = this.stripeService.getInstance(); // Replace with your publishable key
    this.elements = this.paymentElement.nativeElement;//this.stripe.elements();
  }
  pay(){
    this.createPaymentIntent(this.amount);

    this.orderService.makeAnOrder(this.paymentForm.get('email')?.value);
     console.log('elementsoptions :', this.cardOptions)
    console.log('elements',this.paymentElement.nativeElement);
     if(this.paymentForm.valid){
       this.paying = true;
       this.stripeService.confirmPayment({
         elements:  this.paymentElement.nativeElement,
            clientSecret:environment.stripe.testKey,
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
         console.log('elements',this.paymentElement.nativeElement);
         this.paying = false;
         console.log('Result', result);
         if(result.error){
           alert(result.error.message);
         }else{
           if(result.paymentIntent.status === 'succeeded'){
             alert({success: true});
             this.shoppingCartService.showMessage('Payment was successful');
             //this.orderService.createOrder(new Order());
             this.router.navigate(['orders']);
           }
         }
       });
     }else {
       console.log(this.paymentForm)
     }
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    console.log('sending order')
    return this.http.post<PaymentIntent>(
      `${environment.paymentApiUrl}/order`,{amount}
      //`${env.apiUrl}/create-payment-intent`,{amount}
    );

  }

}
