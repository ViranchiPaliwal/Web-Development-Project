import {USER_ROLE} from "../enums/userRole";

export class User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    role: USER_ROLE


  constructor() {
    this.username = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.address = "";
    this.phone = "";
  }
}
