import { Component, OnInit } from '@angular/core';
import {PropertyServiceClient} from "../services/property.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {User} from "../models/user.model.client";
import {WishlistServiceClient} from "../services/wishlist.service.client";
import {InviteServiceClient} from "../services/invite.service.client";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private service: PropertyServiceClient,
              private userService: UserServiceClient,
              private propService: PropertyServiceClient,
              private wishService: WishlistServiceClient,
              private inviteService: InviteServiceClient,
              private router: Router) {

  }
  propList;
  allUser
  owners
  tenants
  user
  newuser: User = new User()
  userTypes
  isUsernameExist = false
  properties
  wishUser
  wishProp
  inviteUser
  inviteProp
  ngOnInit() {
    this.findAllUsers()
    this.propService.findAllProperties()
      .then((prop) => {
        this.properties = prop
        console.log('success')
      })
    this.userTypes= ["Owner", "Tenant", "Admin"];
  }

  findAllUsers(){
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

  createUser() {
    this.userService.findUserByUserName(this.newuser.username)
      .then(user => {
        if (user.invalid) {
          this.isUsernameExist = false;
          this.userService
            .createUser(this.newuser)
            .then(() => {
            this.findAllUsers()
            this.cleanNewUser()
            })
        } else {
          this.isUsernameExist = true;
        }
      });
  }

  addToWishlist(){
    this.wishService.addTenantPropertyToWishlist(this.wishUser,this.wishProp)
      .then(() => alert("Wishlist updated successfully."))
  }

  cleanNewUser(){
    this.newuser.username='';
    this.newuser.password='';
  }

  createProperty(){
    this.router.navigate(['property/new']);
  }

  invites(userId){
  this.router.navigate(['invites/',userId]);
  }

  addToInvitelist(){
    var invite = {
      user: this.inviteUser,
      property: this.inviteProp,
      status: "Pending"
    }
    this.inviteService.addToInvitation(invite)
      .then(() => alert("InviteList updated successfully."))
  }


}
