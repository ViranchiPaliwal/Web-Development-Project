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
              private inviteService: InviteServiceClient,
              private router: Router) {
  }

  @ViewChild('autocomplete') autocomplete: any;

  properties : Property[] = []
  universities : University[] = []
  wishList
  invite: Invite = new Invite()
  isInterested
  ngOnInit() {

          this.universityService.findAllUniversities()
            .then((universities) => {
                this.universities = universities.map(function (item) {
                  return {name: item['Institution_Name'],
                    id: item['_id']};
                });
              }
            );
        this.getTenantWishList();
  }

  autocompleteValueChange(selectedUniversity){
    this.propertyService
      .findPropertiesForUniversity(selectedUniversity.id)
      .then((properties)=> this.properties = properties);
  }

  checkAlreadyInWishList(propertyId){
    for(var index in this.wishList){
      if(this.wishList[index].property._id === propertyId ){
        return false
      }
    }
    return true
  }

  getTenantWishList(){
    this.wishlistService.findWishListedPropertiesForUser()
      .then((wishList) => this.wishList = wishList);
  }

  addToWishList(propertyId){
    this.wishlistService.addPropertyToWishlist(propertyId)
      .then(() => this.getTenantWishList())

  }

  getInviteStatus(propertyId){
      this.inviteService.findInvitationByCredentials(propertyId)
        .then((invite) => {
            if (invite.invalid) {
              this.isInterested = false;
            }
            else{
              this.isInterested = true;
            }
          }
        )
  }


}
