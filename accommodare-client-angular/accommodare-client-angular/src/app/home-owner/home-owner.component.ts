import {Component, OnInit, ViewChild} from '@angular/core';
import {UniversityServiceClient} from "../services/university.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {Address} from "../models/address.model.client";
import {University} from "../models/university.model.client";
import {Property} from "../models/property.model.client";
import {PropertyServiceClient} from "../services/property.service.client";
import {User} from "../models/user.model.client";

@Component({
  selector: 'app-home-owner',
  templateUrl: './home-owner.component.html',
  styleUrls: ['./home-owner.component.css']
})
export class HomeOwnerComponent implements OnInit {

  constructor(private propertyService: PropertyServiceClient,
              private userService: UserServiceClient,
              private universityService: UniversityServiceClient,
              private router: Router) {
    this.propertyTypes = ["Apartment", "House"]
    this.availTypes = ["Entire place", "Private Room", "Shared Room"]
  }

  @ViewChild('autocomplete') autocomplete: any;

  autocompleter;
  propertyTypes
  university
  universities: University[] = []
  address
  property: Property = new Property()
  availTypes
  addressForm
  user: User = new User();

  ngOnInit() {
    this.property.address = new Address()
    this.autocompleter = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */this.autocomplete.nativeElement,
      {types: ['geocode']});
    // this.autocompleter.addListener('place_changed', this.fillInAddress);
    google.maps.event.addListener(this.autocompleter, 'place_changed', () => { // arrow function
      this.addressForm = this.cleanAddressForm();
      var place = this.autocompleter.getPlace();

      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (addressType in this.addressForm) {
          this.addressForm[addressType] = place.address_components[i]['short_name'];
        }
      }
      this.property.address.number = this.addressForm.street_number
      this.property.address.street = this.addressForm.route
      this.property.address.city = this.addressForm.locality
      this.property.address.state = this.addressForm.administrative_area_level_1
      this.property.address.zip = this.addressForm.postal_code

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

  cleanAddressForm() {
    return {
      street_number: '',
      route: '',
      locality: '',
      administrative_area_level_1: '',
      country: '',
      postal_code: ''
    };
  }

  submit() {
    this.propertyService.createProperty(this.property)
      .then(() =>
        this.router.navigate(['listing'])
      );
  }

  autocompleteOwnerValueChange(selectedUniversity) {
    this.property.university = selectedUniversity.id;
  }


}
