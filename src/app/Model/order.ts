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
  private _orderNumber!: bigint;
  private _items!: Item[];
  private _total!: number;
  private _orderedDate!: Date;
  private _updateDate!: Date;
  private _userId!: string;
  private _status!: string;

  public get status(){
    return this._status
  }
  public set status(value){
    this._status = value;
  }

  public get updateDate(){
    return this._updateDate
  }
  public set updateDate(value){
    this._updateDate = value;
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

  public get client (){
    return this._userId;
  }

  public set userId (value: string){
    this._userId = value;
  }
}
