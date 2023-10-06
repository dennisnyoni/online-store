import {Order} from "./order";
import {User} from "./user";

export class Client extends User {
  private _orders!: Order[];

  public get orders(){
    return this._orders
  }

  public set orders(value){
    this._orders = value;
  }
}
