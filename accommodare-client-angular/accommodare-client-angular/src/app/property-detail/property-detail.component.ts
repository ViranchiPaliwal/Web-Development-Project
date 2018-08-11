import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Property} from "../models/property.model.client";
import {PropertyServiceClient} from "../services/property.service.client";

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  constructor(private service: PropertyServiceClient, private route: ActivatedRoute) {
          this.route.params.subscribe(
              params => this.propertyId = params['propertyId']);
}

property: Property = new Property()
propertyId

  ngOnInit() {
      this.service.findPropertyById(this.propertyId)
        .then((property) => this.property = property)
  }

}
