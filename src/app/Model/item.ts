import {Product} from "./product";
import {Order} from "./order";

export class Item {

  private _id!:number;
  private _quantity!:number;
  private _subTotal!:number;
  private _product!: Product;
  private _orders!: Order[];

  public get orders(){
    return this._orders;
  }
  public set orders(value){
    this._orders = value;
  }
  public get product(){
    return this._product;
  }
  public set product(value){
    this._product = value;
  }

  public get subTotal(){
    return this._subTotal;
  }
  public set subTotal(value){
    this._subTotal = value;
  }


  public get id(){
    return this._id;
  }
  public set id(value){
    this._id = value;
  }

  public get quantity(){
    return this._quantity;
  }
  public set quantity(value){
    this._quantity = value;
  }
}
