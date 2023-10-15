import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../Model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productBaseUrl:string = 'localhost:8889/product-service';
  constructor(private http: HttpClient) { }

    getProductById(id: number): Observable<any>{
    return this.http.get(`${this.productBaseUrl}/${id}`);
  }

  createProduct(formData: FormData): Observable<any>{
    return this.http.post(`${this.productBaseUrl}`, formData);
  }

  updateProduct(id: number, value: any): Observable<any>{
    return this.http.put(`${this.productBaseUrl}/${id}`,value);
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete(`${this.productBaseUrl}/${id}`,{responseType: 'text'});
  }

  getProductList(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.productBaseUrl}`);
  }
}
