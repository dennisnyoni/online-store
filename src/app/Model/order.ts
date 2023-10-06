import {Product} from "./product";
import {Address} from "./address";

export class Order {
  private _orderNumber!: bigint;
  private _products!: Product[];
  private _totalPrice!: number;
  private _billingAddress!: Address;

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

  public get billingAddress (){
    return this._billingAddress;
  }

  public set billingAddress (value){
    this._billingAddress = value;
  }
}
