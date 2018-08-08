import {Component, OnInit, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import {Property} from "../models/property.model.client";
import {Address} from "../models/address.model.client";
import {PropertyServiceClient} from "../services/property.service.client";

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  constructor(private service: PropertyServiceClient) {
    this.propertyTypes = ["Apartment", "House"]
    this.universities = ["Northeastern", "Sunny Buffalo"]
    this.availTypes = ["Entire place", "Private Room", "Shared Room"]

  }

  @ViewChild('autocomplete') autocomplete: any;

  autocompleter;
  propertyType
  propertyTypes
  university
  universities
  address
  property: Property = new Property()
  availTypes
  availType
  addressForm

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
      this.property.address.country = this.addressForm.administrative_area_level_1
      this.property.address.zip = this.addressForm.postal_code

    });
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

  submit(){
      this.service.createProperty(this.property)
        .then( () =>
          console.log("success")
        );
  }


}
