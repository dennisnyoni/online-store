import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShipIn} from "../Model/ship-in";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ShipInService {

  shipInBaseUrl:string = environment.shipInBaseUrl;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds (2 seconds)
    });
  }
  getShipInById(id: number): Observable<any>{
    return this.http.get(`${this.shipInBaseUrl}/${id}`);
  }

  createShipIn(shipIn: ShipIn): Observable<any>{
    return this.http.post(`${this.shipInBaseUrl}`, shipIn);
  }

  updateShipIn(id: number, value: any): Observable<any>{
    return this.http.put(`${this.shipInBaseUrl}/${id}`,value);
  }

  deleteShipIn(id: number): Observable<any>{
    return this.http.delete(`${this.shipInBaseUrl}/${id}`,{responseType: 'text'});
  }

  getShipInList(): Observable<ShipIn[]>{
    return this.http.get<ShipIn[]>(`${this.shipInBaseUrl}`);
  }

  searchShipIns(filterCriteria: any):Observable<ShipIn[]> {
    // Create a new HttpParams object to handle query parameters
    let params = new HttpParams();

    // Iterate through the filter criteria object and add them to the params
    for (const key in filterCriteria) {
      if (filterCriteria.hasOwnProperty(key)) {
        params = params.set(key, filterCriteria[key]);
      }
    }

    return this.http.get<ShipIn[]>(`${this.shipInBaseUrl}/shipins`, { params });
  }
}
