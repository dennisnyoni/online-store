import {Vendor} from "./vendor";

export class ShipOut {
  private _shipmentId!: number;
  private _shipmentDate!: Date;
  private _quantity!: number;

  public get shipmentId(){
    return this._shipmentId;
  }
  public set shipmentId(value){
    this._shipmentId= value;
  }

  public get shipmentDate(){
    return this._shipmentDate;
  }
  public set shipmentDate(value){
    this._shipmentDate= value;
  }
  public get quantity(){
    return this._quantity;
  }
  public set quantity(value){
    this._quantity= value;
  }

}

export class ShipIn {
  private _shipmentId!: number;
  private _shipmentDate!: Date;
  private _quantity!: number;

  public get shipmentId(){
    return this._shipmentId;
  }
  public set shipmentId(value){
    this._shipmentId= value;
  }

  public get shipmentDate(){
    return this._shipmentDate;
  }
  public set shipmentDate(value){
    this._shipmentDate= value;
  }
  public get quantity(){
    return this._quantity;
  }
  public set quantity(value){
    this._quantity= value;
  }
}

export class Product {
  private _name!: string;//
  private _productId!: number;
  private _unitPrice!: number;//
  private _category!: number;//
  private _images!: File[];//
  private _description!: string;//
  private _isApproved!: boolean;
  private _vendorId!: string;
  private _availableQuantity!: number;
  private _status: string = 'available';
  private _dateAdded: Date= new Date();


  public get dateAdded(){
    return this._dateAdded;
  }
  public set dateAdded(value){
    this._dateAdded= value;
  }

  public get status(){
    return this._status;
  }
  public set status(value){
    this._status= value;
  }

  public get availableQuantity(){
    return this._availableQuantity;
  }
  public set availableQuantity(value){
    this._availableQuantity= value;
  }
  public get vendorId(){
    return this._vendorId;
  }
  public set vendorId(value){
    this._vendorId = value;
  }

  public get unitPrice(){
    return this._unitPrice;
  }
  public set unitPrice(value){
    this._unitPrice = value;
  }

  public get category(){
    return this._category;
  }
  public set category(value){
    this._category = value;
  }

  public get images(){
    return this._images;
  }
  public set images(value){
    this._images = value;
  }

  public get isApproved(){
        return this._isApproved;
    }
  public set isApproved(value){
        this._isApproved = value;
    }
  /*public get vendor(){
    return this._vendor;
  }
  public set vendor(value: Vendor){
    this._vendor = value;
  }*/
  public get name(){
    return this._name;
  }
  public set name(value: string){
    this._name = value;
  }

  public get productId(){
    return this._productId;
  }
  public set productId (value: number){
    this._productId = value;
  }

  public get description(){
    return this._description;
  }
  public set description(value: string){
    this._description = value;
  }
}
