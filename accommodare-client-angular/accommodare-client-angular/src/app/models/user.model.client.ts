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
}
