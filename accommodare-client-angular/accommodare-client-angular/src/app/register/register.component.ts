import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private router: Router,
                private service: UserServiceClient) {
    }

    username;
    userType;
    password;
    password2;
    isLoggedIn = false;
    isPasswordInvaild = false;
    isUsernameExist = false;
    userTypes= ["Owner", "Tenant"];
    register() {
        if (this.password !== this.password2) {
            this.isPasswordInvaild = true;
            return;
        } else {
            this.isPasswordInvaild = false;
        }
        this.service.findUserByUserName(this.username)
            .then(user => {
                if (user.invalid) {
                    this.isUsernameExist = false;
                    this.service
                        .createUser(this.username, this.password, this.userType)
                        .then(() =>
                            this.router.navigate(['profile']));
                } else {
                    this.isUsernameExist = true;
                }
            });
    }

    ngOnInit() {
    }
}
