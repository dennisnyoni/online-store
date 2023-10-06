import {Product} from "./product";
import {User} from "./user";

export class Vendor extends User{

  private _products!: Product[];

  public get products (){
    return this._products
  }

  public set products (value: Product[]){
    this._products = value;
  }
}
