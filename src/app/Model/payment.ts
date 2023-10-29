export class Payment {

  private _id!:number;
  private _paymentId!: string;
  private _orderId!: number;
  private _paymentStatus!: string;


  public get id(){
    return this._id;
  }
  public set id(value){
    this._id = value;
  }
  public get paymentId(){
    return this._paymentId;
  }
  public set paymentId(value){
    this._paymentId = value;
  }

  public get orderId(){
    return this._orderId;
  }
  public set orderId(value){
    this._orderId = value;
  }

  public get paymentStatus(){
    return this._paymentStatus;
  }
  public set paymentStatus(value){
    this._paymentStatus = value;
  }
}
