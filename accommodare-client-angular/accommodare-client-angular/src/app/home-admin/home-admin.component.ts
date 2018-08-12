import { Component, OnInit } from '@angular/core';
import {PropertyServiceClient} from "../services/property.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private service: PropertyServiceClient,
              private userService: UserServiceClient,
              private router: Router) {

  }
  propList;
  allUser
  owners
  tenants
  user
  ngOnInit() {
    this.userService.findAllUsers()
      .then((users) => {
        this.allUser = users
        this.owners = this.allUser.filter((user) => user.role === 'Owner')
        this.tenants = this.allUser.filter((user) => user.role === 'Tenant')
      })
  }

  profile(userId){
    this.router.navigate(['profile/',userId]);
  }

  apartments(userId){
    this.router.navigate(['listing/',userId]);
  }

  wishlist(userId){
    this.router.navigate(['wishlist/',userId]);
  }

}
