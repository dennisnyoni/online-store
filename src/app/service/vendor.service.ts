import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Model/user";
import {Vendor} from "../Model/vendor";

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  vendorBaseUrl:string = '';
  constructor(private http: HttpClient) { }

  getVendor(id: number): Observable<any>{
    return this.http.get(`${this.vendorBaseUrl}/${id}`);
  }

  createVendor(vendor: Vendor): Observable<any>{
    return this.http.post(`${this.vendorBaseUrl}`, vendor);
  }

  updateVendor(id: number, value: any): Observable<any>{
    return this.http.put(`${this.vendorBaseUrl}/${id}`,value);
  }

  deleteVendor(id: number): Observable<any>{
    return this.http.delete(`${this.vendorBaseUrl}/${id}`,{responseType: 'text'});
  }

  getVendorList(): Observable<any>{
    return this.http.get(`${this.vendorBaseUrl}`);
  }
}
