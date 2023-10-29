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

// export class ShipIn {
//   private _shipmentId!: number;
//   private _shipmentDate!: Date;
//   private _quantity!: number;
//
//   public get shipmentId(){
//     return this._shipmentId;
//   }
//   public set shipmentId(value){
//     this._shipmentId= value;
//   }
//
//   public get shipmentDate(){
//     return this._shipmentDate;
//   }
//   public set shipmentDate(value){
//     this._shipmentDate= value;
//   }
//   public get quantity(){
//     return this._quantity;
//   }
//   public set quantity(value){
//     this._quantity= value;
//   }
// }

export class Product {
  private _productName!: string;//
  private _productId!: number;
  private _productPrice!: number;//
  private _productType!: string;//
  private _category!: number;//
  private _image!: File;//
  private _description!: string;//
  private _isApproved!: boolean;
  private _userId!: string;
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
  public get userId(){
    return this._userId;
  }
  public set userId(value){
    this._userId = value;
  }

  public get productType(){
    return this._productType;
  }
  public set productType(value){
    this._productType = value;
  }

  public get productPrice(){
    return this._productPrice;
  }
  public set productPrice(value){
    this._productPrice = value;
  }

  public get category(){
    return this._category;
  }
  public set category(value){
    this._category = value;
  }

  public get image(){
    return this._image;
  }
  public set image(value){
    this._image = value;
  }

  public get isApproved(){
        return this._isApproved;
    }
  public set isApproved(value){
        this._isApproved = value;
    }

  public get productName(){
    return this._productName;
  }
  public set productName(value: string){
    this._productName = value;
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
