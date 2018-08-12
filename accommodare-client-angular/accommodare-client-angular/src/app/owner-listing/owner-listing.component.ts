import { Component, OnInit } from '@angular/core';
import {PropertyServiceClient} from "../services/property.service.client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-owner-listing',
  templateUrl: './owner-listing.component.html',
  styleUrls: ['./owner-listing.component.css']
})
export class OwnerListingComponent implements OnInit {

  constructor(private service: PropertyServiceClient,
              private route: ActivatedRoute,
              private router: Router) {
  this.route.params.subscribe(
    params => this.userId = params['userId']); }
  properties;
  userId;
  ngOnInit() {
    this.service.findPropertiesForOwner(this.userId)
      .then((propList) =>
      this.properties = propList);
  }

  editProperty(propId){
    this.router.navigate(['property/',propId]);
  }
}
