import {Address} from "./address";

export class User {
  private _userName!: string;
  private _firstName!: string;
  private _lastName!: string;
  private _email!: string;
  private _password!: string;
  private _phone!: string;
  private _address!: Address;
  private _isGuest: boolean = false;
  private _isActive: boolean = true;
  private _role!: string;


  public get userName(){
    return this._userName;
  }

  public set userName(value){
    this._userName = value;
  }


  public get role(){
    return this._role;
  }

  public set role(value){
    this._role = value;
  }

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
  public get lastName(){
    return this._lastName;
  }

  public set lastName(value){
    this._lastName = value;
  }
  public get firstName(){
    return this._firstName;
  }
  public set firstName(value){
    this._firstName = value;
  }

}
