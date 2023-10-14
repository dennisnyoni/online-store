import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../Model/client";
import {Order} from "../Model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderBaseUrl:string = '';
  constructor(private http: HttpClient) { }

  getOrder(id: number): Observable<any>{
    return this.http.get(`${this.orderBaseUrl}/${id}`);
  }

  createOrder(order: Order): Observable<any>{
    return this.http.post(`${this.orderBaseUrl}`, order);
  }

  updateOrder(id: number, value: any): Observable<any>{
    return this.http.put(`${this.orderBaseUrl}/${id}`,value);
  }

  deleteOrder(id: number): Observable<any>{
    return this.http.delete(`${this.orderBaseUrl}/${id}`,{responseType: 'text'});
  }

  getOrderList(): Observable<any>{
    return this.http.get(`${this.orderBaseUrl}`);
  }
}
