import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username;
    password;
    isLoggedIn = false;

    login(username, password) {
        console.log([username, password]);
        this.service
            .login(username, password)
            .then((user) => {
                if (!user.invalid) {
                    this.router.navigate(['profile']);
                } else {
                    alert('User not found. Kindly relogin or register if new.');
                    this.router.navigate(['login']);
                }
            });
    }

    constructor(private router: Router,
                private service: UserServiceClient) {
    }

    ngOnInit() {
    }
}
