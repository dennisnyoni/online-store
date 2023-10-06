import {Product} from "./product";

export class ShoppingCart {
  private _products!: Product[];

  public get products(){
    return this._products;
  }
  public set products(value: Product[]){
    this._products = value;
  }
}
