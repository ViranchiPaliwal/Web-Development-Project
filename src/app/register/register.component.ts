import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {User} from "../models/user.model.client";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private router: Router,
                private service: UserServiceClient) {
    }

    user: User = new User()
    password2;
    isLoggedIn = false;
    isPasswordInvaild = false;
    isUsernameExist = false;
    userTypes= ["Owner", "Tenant", "Admin"];
    register() {
        if (this.user.password !== this.password2) {
            this.isPasswordInvaild = true;
            return;
        } else {
            this.isPasswordInvaild = false;
        }
        this.service.findUserByUserName(this.user.username)
            .then(user => {
                if (user.invalid) {
                    this.isUsernameExist = false;
                    this.service
                        .createUser(this.user)
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
