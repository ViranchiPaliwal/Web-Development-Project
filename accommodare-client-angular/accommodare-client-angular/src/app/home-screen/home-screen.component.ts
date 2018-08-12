import {Component, OnInit, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import {Router} from "@angular/router";
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {USER_ROLE} from "../enums/userRole";
import {HttpClient} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private router: Router) {
  }
  role = USER_ROLE
  user: User = new User();
  isLoggedIn = false;
  isAnonymous = false;
  isOwner = false;
  isTenant = false;
  ngOnInit() {
    this.userService.profile()
      .then(user => {
        if (!user.invalid) {
          this.user = user;
          this.isAnonymous = false;
          this.isLoggedIn = true;
          if(user.role===this.role.Tenant){
            this.isTenant = true;
          }
          if(user.role===this.role.Owner){
            this.isOwner = true;
          }
        } else {
          this.isAnonymous = true;
          this.isLoggedIn = false;
        }
      });
  }
}
