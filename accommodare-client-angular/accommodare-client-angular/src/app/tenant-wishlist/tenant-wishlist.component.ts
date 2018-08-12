import {Component, OnInit, ViewChild} from '@angular/core';
import {WishlistServiceClient} from "../services/wishlist.service.client";
import {UniversityServiceClient} from "../services/university.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {Property} from "../models/property.model.client";
import {University} from "../models/university.model.client";
import {PropertyServiceClient} from "../services/property.service.client";

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
  ngOnInit() {
  this.findWishListedPropertiesForUser();
  if(this.tenantId!='self'){
    this.isAdmin = true
  }
  }

  findWishListedPropertiesForUser(){
    this.wishlistService.findWishListedPropertiesForUser(this.tenantId)
      .then((wishlist) =>{ this.properties = wishlist.map((wish) => wish.property);
      console.log('success')});
  }



  deleteFromWishList(propertyId){
    this.wishlistService.removePropertyFromWishlist(this.tenantId, propertyId)
      .then(() => this.findWishListedPropertiesForUser())
  }


}
