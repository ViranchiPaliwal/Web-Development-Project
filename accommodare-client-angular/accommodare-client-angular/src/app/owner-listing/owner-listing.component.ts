import { Component, OnInit } from '@angular/core';
import {PropertyServiceClient} from "../services/property.service.client";

@Component({
  selector: 'app-owner-listing',
  templateUrl: './owner-listing.component.html',
  styleUrls: ['./owner-listing.component.css']
})
export class OwnerListingComponent implements OnInit {

  constructor(private service: PropertyServiceClient) { }
  propList;
  ngOnInit() {
    this.service.findPropertiesForOwner()
      .then((propList) =>
      this.propList = propList);
  }

}
