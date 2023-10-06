import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../Model/product";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerBaseUrl:string = '';
  constructor(private http: HttpClient) { }

  getCustomer(id: number): Observable<any>{
    return this.http.get(`${this.customerBaseUrl}/${id}`);
  }

  createCustomer(customer: Customer): Observable<any>{
    return this.http.post(`${this.customerBaseUrl}`, customer);
  }

  updateCustomer(id: number, value: any): Observable<any>{
    return this.http.put(`${this.customerBaseUrl}/${id}`,value);
  }

  deleteCustomer(id: number): Observable<any>{
    return this.http.delete(`${this.customerBaseUrl}/${id}`,{responseType: 'text'});
  }

  getCustomerList(): Observable<any>{
    return this.http.get(`${this.customerBaseUrl}`);
  }
}
