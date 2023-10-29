import {Product} from "./product";
import {Address} from "./address";
import {Client} from "./client";

export class Item {
  private _name!: string;
  private _price!: number;
  private _quantity!: number;

  public get name(){
    return this._name
  }
  public set name(value: string){
    this._name = value;
  }
  public get price(){
    return this._price
  }
  public set price(value: number){
    this._quantity = value;
  }

  public get quantity(){
    return this._quantity
  }
  public set quantity(value: number){
    this._quantity = value;
  }

}

export class Order {

  private _id!:number;
  private _orderedDate!: Date;
  private _orderStatus!: string;
  private _paymentStatus!: string;
  private _total!: number;
  private _totalQuantity!: number;
  private _userEmail!: string;
  private _orderNumber!: bigint; //required on the bac
  private _items!: Item[];
  //private _updateDate!: Date;

  public get id(){
    return this._id
  }
  public set id(value){
    this._id= value;
  }

  public get paymentStatus(){
    return this._paymentStatus
  }
  public set paymentStatus(value){
    this._paymentStatus= value;
  }

  public get orderStatus(){
    return this._orderStatus
  }
  public set orderStatus(value){
    this._orderStatus= value;
  }

  public get totalQuantity(){
    return this._totalQuantity
  }
  public set totalQuantity(value){
    this._totalQuantity = value;
  }

  public get orderedDate(){
    return this._orderedDate
  }
  public set orderedDate(value){
    this._orderedDate = value;
  }

  public get orderNumber(){
    return this._orderNumber
  }
  public set orderNumber(value){
    this._orderNumber = value;
  }

  public get items (){
    return this._items
  }

  public set items (value){
    this._items = value;
  }

  public get total (){
    return this._total;
  }

  public set total (value  ){
    this._total = value;
  }

  public get userEmail(){
    return this._userEmail;
  }

  public set userEmail (value: string){
    this._userEmail= value;
  }
}
