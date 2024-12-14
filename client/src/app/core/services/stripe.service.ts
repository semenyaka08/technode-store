import {inject, Injectable} from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeAddressElement,
  StripeAddressElementOptions,
  StripeElements,
} from '@stripe/stripe-js';
import {environment} from '../../../environments/environment';
import {CartService} from './cart.service';
import {HttpClient} from '@angular/common/http';
import {Cart} from '../../shared/models/cart';
import {map} from 'rxjs';
import { firstValueFrom } from 'rxjs';
import {AccountService} from './account.service';


@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private readonly stripePromise: Promise<Stripe | null>;
  apiUrl = environment.apiUrl;
  private cartService = inject(CartService);
  private httpClient = inject(HttpClient);
  elements?: StripeElements;
  addressElement? : StripeAddressElement;
  private accountService = inject(AccountService);

  constructor() {
    this.stripePromise = loadStripe(environment.publicStripeKey);
  }

  getStripeInstance(){
    return this.stripePromise;
  }

  async initializeElements(){
    if(!this.elements){
      const stripe = await this.getStripeInstance();
      if(stripe){
        const cart = await firstValueFrom(this.createOrUpdatePaymentIntent());
        this.elements = stripe.elements({clientSecret: cart.clientSecret, appearance: {labels: 'floating'}})
      }else{
        throw new Error("Stripe was not loaded");
      }
    }
    return this.elements;
  }

  async createAddressElement(){
    if(!this.addressElement){
      const user = this.accountService.currentUser();
      const elements = await this.initializeElements();
      let defaultValues: StripeAddressElementOptions['defaultValues'] = {};
      if(user){
        defaultValues.name = user.firstName + ' ' + user.lastName;
        if(user.userAddress)
          defaultValues.address = {
            line1: user.userAddress.line1,
            line2: user.userAddress.line2,
            city: user.userAddress.city,
            state: user.userAddress.state,
            country: user.userAddress.country,
            postal_code: user.userAddress.postalCode
          }
      }

      if(!elements)
        throw new Error("Some problems with loading stripe elements");
      const options: StripeAddressElementOptions = {
        mode: 'shipping',
        defaultValues
      }
      this.addressElement = elements.create("address", options);
    }

    return this.addressElement;
  }

  createOrUpdatePaymentIntent(){
    const cart = this.cartService.cart();

    if(cart == null)
      throw new Error("Something wrong with cart");

    return this.httpClient.post<Cart>(this.apiUrl + "payment/" + `${cart.id}`, {}, {withCredentials: true}).pipe(
      map(data=>{
        this.cartService.setCart(data)
        return data;
      })
    )
  }
}
