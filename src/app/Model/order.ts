import {Product} from "./product";
import {Address} from "./address";
import {Client} from "./client";

export class Order {
  private _orderNumber!: bigint;
  private _products!: Product[];
  private _totalPrice!: number;
  private _creationDate!: Date;
  private _updateDate!: Date;
  private _client!: Client;

  public get updateDate(){
    return this._updateDate
  }
  public set updateDate(value){
    this._updateDate = value;
  }

  public get creationDate(){
    return this._creationDate
  }
  public set creationDate(value){
    this._creationDate = value;
  }

  public get orderNumber(){
    return this._orderNumber
  }
  public set orderNumber(value){
    this._orderNumber = value;
  }

  public get products (){
    return this._products
  }

  public set products (value){
    this._products = value;
  }

  public get totalPrice (){
    return this._totalPrice;
  }

  public set totalPrice (value  ){
    this._totalPrice = value;
  }

  public get client (){
    return this._client;
  }

  public set client (value){
    this._client = value;
  }
}
