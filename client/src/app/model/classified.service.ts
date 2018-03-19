
export class Classified{

  id : string;
  description :string;
  location : string;
  price : number;
  category : string;

  constructor(){
    this.description = "";
    this.location ="";
    this.price = 0;
    this.category = "Default";
  }
}
