export class Address {

  private _street!: string;
  private _city!: string;
  private _state!: string;
  private _zipcode!: string;

  public get zipcode(){
    return this._zipcode;
  }

  public set zipcode(value){
    this._zipcode = value;
  }

  public get street(){
    return this._street;
  }

  public set street(value){
    this._street = value;
  }

  public get city(){
    return this._city;
  }

  public set city(value){
    this._city = value;
  }

  public get state(){
    return this._state;
  }

  public set state(value){
    this._state = value;
  }
}
