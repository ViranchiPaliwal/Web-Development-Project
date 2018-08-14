import {Component, OnInit, ViewChild} from '@angular/core';
import {WishlistServiceClient} from "../services/wishlist.service.client";
import {UniversityServiceClient} from "../services/university.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {Property} from "../models/property.model.client";
import {University} from "../models/university.model.client";
import {PropertyServiceClient} from "../services/property.service.client";
import {USER_ROLE} from "../enums/userRole";

@Component({
  selector: 'app-tenant-wishlist',
  templateUrl: './tenant-wishlist.component.html',
  styleUrls: ['./tenant-wishlist.component.css']
})
export class TenantWishlistComponent implements OnInit {

  constructor(private propertyService: PropertyServiceClient,
              private userService: UserServiceClient,
              private universityService: UniversityServiceClient,
              private wishlistService: WishlistServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
  this.route.params.subscribe(
    params => this.tenantId = params['tenantId']);
  }

  @ViewChild('autocomplete') autocomplete: any;

  properties : Property[] = []
  wishList
  tenantId
  isAdmin = false
  isLoggedIn = false
  isAnonymous
  isTenant = false
  isOwner = false
  role = USER_ROLE
  user
  isWishListEmpty
  ngOnInit() {
    this.userService.profile()
      .then(user => {
        if (!user.invalid&&user.role!=this.role.Owner) {
          this.user = user;
          this.isLoggedIn = true;
          if(user.role===this.role.Tenant){
            this.isTenant = true;
          }
        } else {
          alert('Invalid user or your session has expired. Kindly login.');
          this.router.navigate(['login']);
        }
      });
    this.findWishListedPropertiesForUser();
  if(this.tenantId!='self'){
    this.isAdmin = true
  }
  }

  findWishListedPropertiesForUser(){
    this.wishlistService.findWishListedPropertiesForUser(this.tenantId)
      .then((wishlist) =>{
        this.properties = wishlist.map((wish) => wish.property);
        if(this.properties && this.properties.length==0){
          this.isWishListEmpty = true;
        }
        else{
          this.isWishListEmpty = false;
        }
      });
  }



  deleteFromWishList(propertyId){
    this.wishlistService.removePropertyFromWishlist(this.tenantId, propertyId)
      .then(() => this.findWishListedPropertiesForUser())
  }


}
