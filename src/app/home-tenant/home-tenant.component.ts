import {Component, OnInit, ViewChild} from '@angular/core';
import {UniversityServiceClient} from "../services/university.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {University} from "../models/university.model.client";
import {PropertyServiceClient} from "../services/property.service.client";
import {Property} from "../models/property.model.client";
import {WishlistServiceClient} from "../services/wishlist.service.client";
import {Wish} from "../models/wish.model.client";
import {InviteServiceClient} from "../services/invite.service.client";
import {Invite} from "../models/invite.model.client";
import {USER_ROLE} from "../enums/userRole";

@Component({
  selector: 'app-home-tenant',
  templateUrl: './home-tenant.component.html',
  styleUrls: ['./home-tenant.component.css']
})
export class HomeTenantComponent implements OnInit {

  constructor(private propertyService: PropertyServiceClient,
              private userService: UserServiceClient,
              private universityService: UniversityServiceClient,
              private wishlistService: WishlistServiceClient,
              private router: Router) {
  }

  @ViewChild('autocomplete') autocomplete: any;

  properties: Property[] = []
  universities: University[] = []
  wishList
  isLoggedIn = false
  isAnonymous
  isTenant = false
  isOwner = false
  role = USER_ROLE
  user
  ngOnInit() {

    this.userService.profile()
      .then(user => {
        if (!user.invalid) {
          this.user = user;
          this.isLoggedIn = true;
          if(user.role===this.role.Tenant){
            this.isTenant = true;
            this.getTenantWishList();
          }
        } else {
            this.isTenant = false;
        }
      });
    this.universityService.findAllUniversities()
      .then((universities) => {
          this.universities = universities.map(function (item) {
            return {
              name: item['Institution_Name'],
              id: item['_id']
            };
          });
        }
      );
  }

  autocompleteValueChange(selectedUniversity) {
    this.propertyService
      .findPropertiesForUniversity(selectedUniversity.id)
      .then((properties) => this.properties = properties);
  }

  checkAlreadyInWishList(propertyId) {
    for (var index in this.wishList) {
      if (this.wishList[index].property._id === propertyId) {
        return false
      }
    }
    return true
  }

  getTenantWishList() {
    this.wishlistService.findWishListedPropertiesForUser('self')
      .then((wishList) => this.wishList = wishList);
  }

  addToWishList(propertyId) {
    this.wishlistService.addPropertyToWishlist(propertyId)
      .then(() => this.getTenantWishList())
  }


}
