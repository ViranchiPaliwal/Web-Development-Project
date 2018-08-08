import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model.client';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';
import {Course} from '../models/address.model.client';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(private service: UserServiceClient,
                private router: Router) {
    }

    user: User = new User();
    enrollments = [];
    courses: Course[] = [];
    isLoggedIn = false;
    isAdmin = false;

    ngOnInit() {
        this.service.profile()
            .then(user => {
                if (!user.invalid) {
                    this.user = user;
                    if (this.user.username === 'admin') {
                        this.isAdmin = true;
                    }
                    this.isLoggedIn = true;
                } else {
                    alert('Invalid user or your session has expired. Kindly login.');
                    this.router.navigate(['login']);
                }
            });
    }

    getProfile() {
        this.service
            .profile()
            .then(user =>
                this.user = user);
    }


    updateProfile() {
        this.service
            .updateProfile(this.user)
            .then(() => this.getProfile());
    }

}
