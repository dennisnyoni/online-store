import {User} from "./user";

export class Card {
   private _cardNumber!: string;
   private _cvc!: string;
   private _month!: number;
   private _year!: number;
   private _cardHolder!: User;

    public get cardHolder(){
        return this._cardHolder;
    }

    public set cardHolder(value){
        this._cardHolder=value;
    }

    public get year(){
        return this._year;
    }

    public set year(value){
        this._year=value;
    }
    public get month(){
        return this._month;
    }

    public set month(value){
        this._month=value;
    }

    public get cvc(){
        return this._cvc;
    }

    public set cvc(value){
        this._cvc=value;
    }
   public get cardNumber(){
       return this._cardNumber;
   }

    public set cardNumber(value){
        this._cardNumber=value;
    }
}
