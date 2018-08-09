import {Component, OnInit, ViewChild} from '@angular/core';
import {UniversityServiceClient} from "../services/university.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {University} from "../models/university.model.client";
import {PropertyServiceClient} from "../services/property.service.client";
import {Property} from "../models/property.model.client";

@Component({
  selector: 'app-home-tenant',
  templateUrl: './home-tenant.component.html',
  styleUrls: ['./home-tenant.component.css']
})
export class HomeTenantComponent implements OnInit {

  constructor(private propertyService: PropertyServiceClient,
              private userService: UserServiceClient,
              private universityService: UniversityServiceClient,
              private router: Router) {
  }

  @ViewChild('autocomplete') autocomplete: any;

  properties : Property[] = []
  universities : University[] = []

  ngOnInit() {

          this.universityService.findAllUniversities()
            .then((universities) => {
                this.universities = universities.map(function (item) {
                  return {name: item['Institution_Name'],
                    id: item['_id']};
                });
              }
            );
  }

  autocompleteValueChange(selectedUniversity){
    this.propertyService
      .findPropertiesForUniversity(selectedUniversity.id)
      .then((properties)=> this.properties = properties);
  }


}
