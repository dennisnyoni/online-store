import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../Model/product";
import {Client} from "../Model/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientBaseUrl:string = '';
  constructor(private http: HttpClient) { }

  getClient(id: number): Observable<any>{
    return this.http.get(`${this.clientBaseUrl}/${id}`);
  }

  createClient(client: Client): Observable<any>{
    return this.http.post(`${this.clientBaseUrl}`, client);
  }

  updateClient(id: number, value: any): Observable<any>{
    return this.http.put(`${this.clientBaseUrl}/${id}`,value);
  }

  deleteClient(id: number): Observable<any>{
    return this.http.delete(`${this.clientBaseUrl}/${id}`,{responseType: 'text'});
  }

  getClientList(): Observable<any>{
    return this.http.get(`${this.clientBaseUrl}`);
  }
}
