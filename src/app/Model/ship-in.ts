import {Product} from "./product";

export class ShipIn {

  private _shipInId!: number;
  private _shipmentDate!: Date;
  private _quantity!: number;
  private _product!:Product;
  private _shipInEventType!:string;

  public get shipInEventType(){
    return this._shipInEventType;
  }
  public set shipInEventType(value){
    this._shipInEventType = value;
  }
  public get shipInId(){
    return this._shipInId;
  }
  public set shipInId(value){
    this._shipInId = value;
  }
  public get shipmentDate(){
    return this._shipmentDate;
  }
  public set shipmentDate(value){
    this._shipmentDate = value;
  }

  public get quantity(){
    return this._quantity;
  }
  public set quantity(value){
    this._quantity = value;
  }


  public get product(){
    return this._product;
  }
  public set product(value){
    this._product = value;
  }

}
