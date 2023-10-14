import {Address} from "./address";

export class User {
  private _firstname!: string;
  private _lastname!: string;
  private _email!: string;
  private _password!: string;
  private _phone!: string;
  private _address!: Address;
  private _isGuest: boolean = false;
  private _isActive: boolean = true;

  public get isActive(){
    return this._isActive;
  }

  public set isActive(value){
    this._isActive = value;
  }
  public get isGuest(){
    return this._isGuest;
  }

  public set isGuest(value){
    this._isGuest = value;
  }

  public get address(){
    return this._address;
  }

  public set address(value){
    this._address = value;
  }
  public get phone(){
    return this._phone;
  }

  public set phone(value: string){
    this._phone = value;
  }

  public get password(){
    return this._password;
  }

  public set password(value: string){
    this._password = value;
  }
  public get email(){
    return this._email;
  }

  public set email(value){
    this._email = value;
  }
  public get lastname(){
    return this._lastname;
  }

  public set lastname(value){
    this._lastname = value;
  }
  public get firstname(){
    return this._firstname;
  }
  public set firstname(value){
    this._firstname = value;
  }

}
