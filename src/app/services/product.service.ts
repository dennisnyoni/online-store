import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../Model/product";
import {environment} from "../../../environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productBaseUrl:string = environment.productBaseUrl;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }


  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds (2 seconds)
    });
  }
    getProductById(id: number): Observable<any>{
    return this.http.get(`${this.productBaseUrl}/${id}`);
  }

  createProduct(formData: FormData): Observable<any>{
    return this.http.post(`${this.productBaseUrl}`, formData);
  }

  createShipin(id: number, value: any): Observable<any>{
    return this.http.post(`${this.productBaseUrl}/${id}`, value);
  }

  ///shipin

  updateProduct(id: number, value: any): Observable<any>{
    return this.http.put(`${this.productBaseUrl}/${id}`,value);
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete(`${this.productBaseUrl}/${id}`,{responseType: 'text'});
  }

  getProductList(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.productBaseUrl}`);
  }

  searchProducts(filterCriteria: any):Observable<Product[]> {
    // Create a new HttpParams object to handle query parameters
    let params = new HttpParams();

    // Iterate through the filter criteria object and add them to the params
    for (const key in filterCriteria) {
      if (filterCriteria.hasOwnProperty(key)) {
        params = params.set(key, filterCriteria[key]);
      }
    }

    return this.http.get<Product[]>(`${this.productBaseUrl}/products`, { params });
  }
}
