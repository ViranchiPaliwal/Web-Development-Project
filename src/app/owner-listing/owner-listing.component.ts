import {Component, OnInit} from '@angular/core';
import {PropertyServiceClient} from "../services/property.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {USER_ROLE} from "../enums/userRole";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-owner-listing',
  templateUrl: './owner-listing.component.html',
  styleUrls: ['./owner-listing.component.css']
})
export class OwnerListingComponent implements OnInit {

  constructor(private service: PropertyServiceClient,
              private userService: UserServiceClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(
      params => this.userId = params['userId']);
  }

  properties;
  userId;
  isAdmin = false;
  isLoggedIn = false;
  isTenant = false;
  isOwner = false;
  role = USER_ROLE;
  isPropListEmpty = false
  ngOnInit() {
    this.userService.profile()
      .then(user => {
        if (!user.invalid && user.role != this.role.Tenant) {
          if (user.role === this.role.Owner) {
            this.isOwner = true;
            this.isLoggedIn = true;
          }
          if (this.userId != 'self') {
            this.isAdmin = true
          }
          this.service.findPropertiesForOwner(this.userId)
            .then((propList) =>
            {
              this.properties = propList
              if(this.properties && this.properties.length==0){
                this.isPropListEmpty = true;
              }
              else{
                this.isPropListEmpty = false;
              }
            });
        }
        else {
          alert('Invalid user or your session has expired. Kindly login.');
          this.router.navigate(['login']);
        }
      });


  }

  editProperty(propId) {
    this.router.navigate(['property/', propId]);
  }
}
