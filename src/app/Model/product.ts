import {Vendor} from "./vendor";

export class Product {
  private _name!: string;
  private _productId!: bigint;
  private _description!: string;
  private _isApproved!: boolean;
  private _vendor!: Vendor;

  public get isApproved(){
        return this._isApproved;
    }
  public set isApproved(value){
        this._isApproved = value;
    }
  public get vendor(){
    return this._vendor;
  }
  public set vendor(value: Vendor){
    this._vendor = value;
  }
  public get name(){
    return this._name;
  }
  public set name(value: string){
    this._name = value;
  }

  public get productId(){
    return this._productId;
  }
  public set productId (value: bigint){
    this._productId = value;
  }

  public get description(){
    return this._description;
  }
  public set description(value: string){
    this._description = value;
  }
}
