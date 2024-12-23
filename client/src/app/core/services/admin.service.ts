import {inject, Injectable} from '@angular/core';
import {OrdersParameters} from '../../shared/models/ordersParameters';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PageResult} from '../../shared/models/page-result';
import {Order} from '../../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getAllOrders(ordersParameters: OrdersParameters){
    let url = this.baseUrl + 'admin/orders';
    const params = new URLSearchParams();

    if(ordersParameters.selectedSort){
      params.append(`sortBy`, ordersParameters.selectedSort.sortBy);
      params.append(`sortDirection`, ordersParameters.selectedSort.sortDirection);
    }

    if(ordersParameters.paginationParams){
      params.append(`pageSize`, ordersParameters.paginationParams.pageSize.toString());
      params.append(`pageNumber`, ordersParameters.paginationParams.pageNumber.toString());
    }

    if(ordersParameters.orderStatus){
      params.append(`orderStatus`, ordersParameters.orderStatus);
    }

    if(ordersParameters.searchParam){
      params.append(`searchParam`, ordersParameters.searchParam);
    }

    url += `?${params.toString()}`;

    return this.httpClient.get<PageResult<Order>>(url, {withCredentials: true});
  }
}
