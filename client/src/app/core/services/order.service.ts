import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Order, OrderToCreate} from '../../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;
  orderComplete = false;

  getOrderById(id: number){
   return this.httpClient.get<Order>(this.baseUrl + `orders/${id}`, {withCredentials: true});
  }

  getOrdersForSpecificUser(){
    return this.httpClient.get<Order[]>(this.baseUrl + 'orders', {withCredentials: true});
  }

  createOrder(orderToCreate: OrderToCreate){
    return this.httpClient.post<Order>(this.baseUrl + 'orders', orderToCreate, {withCredentials: true})
  }
}
