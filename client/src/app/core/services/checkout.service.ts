import {inject, Injectable} from '@angular/core';
import {map, of} from 'rxjs';
import {DeliveryMethod} from '../../shared/models/delivery-method';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  deliveryMethods: DeliveryMethod[] = [];
  private httpClient = inject(HttpClient);
  apiUrl = environment.apiUrl;


  getDeliveryMethods(){
    if(this.deliveryMethods.length>0)
      return of(this.deliveryMethods);
    return this.httpClient.get<DeliveryMethod[]>(this.apiUrl + 'payment/deliveryMethods').pipe(
      map(data=>{
        data = data.sort((a,b)=>a.price - b.price)
        this.deliveryMethods = data;
        return data;
      })
    );
  }
}
