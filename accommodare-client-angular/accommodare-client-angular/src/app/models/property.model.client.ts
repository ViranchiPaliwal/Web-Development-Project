import {Address} from "./address.model.client";
export class Property {
  name: String;
  type: String;
  availabilityType: String;
  university: String;
  address: Address;
  description: String;
  rooms: Number;
  size: Number;
  photoId : String[]
  price: Number;
  constructor(){
    this.name = "";
    this.type = "";
    this.availabilityType = "";
    this.university = "";
    this.address = new Address();
    this.description = "";
    this.rooms = 0;
    this.size = 0;
    this.photoId = [];
  }
}
