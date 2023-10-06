import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../Model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productBaseUrl:string = '';
  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<any>{
    return this.http.get(`${this.productBaseUrl}/${id}`);
  }

  createProduct(product: Product): Observable<any>{
    return this.http.post(`${this.productBaseUrl}`, product);
  }

  updateProduct(id: number, value: any): Observable<any>{
    return this.http.put(`${this.productBaseUrl}/${id}`,value);
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete(`${this.productBaseUrl}/${id}`,{responseType: 'text'});
  }

  getProductList(): Observable<any>{
    return this.http.get(`${this.productBaseUrl}`);
  }
}
