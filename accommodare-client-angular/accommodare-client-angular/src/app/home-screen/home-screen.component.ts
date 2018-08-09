import {Component, OnInit, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import {Property} from "../models/property.model.client";
import {Address} from "../models/address.model.client";
import {PropertyServiceClient} from "../services/property.service.client";
import {Router} from "@angular/router";
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {USER_ROLE} from "../enums/userRole";
import {UniversityServiceClient} from "../services/university.service.client";
import {University} from "../models/university.model.client";

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  constructor(private propertyService: PropertyServiceClient,
              private userService: UserServiceClient,
              private universityService: UniversityServiceClient,
              private router: Router) {
    this.propertyTypes = ["Apartment", "House"]
    this.availTypes = ["Entire place", "Private Room", "Shared Room"]
  }

  @ViewChild('autocomplete') autocomplete: any;

  autocompleter;
  propertyType
  propertyTypes
  university
  universities : University[] = []
  address
  property: Property = new Property()
  availTypes
  availType
  addressForm
  user: User = new User();
  isLoggedIn = false;
  isAdmin = false;
  role = USER_ROLE

  ngOnInit() {
    this.userService.profile()
      .then(user => {
        if (!user.invalid) {
          this.user = user;
          if (this.user.username === 'admin') {
            this.isAdmin = true;
          }
          this.isLoggedIn = true;
          if (this.user.role === this.role.Owner) {
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
          }
          this.universityService.findAllUniversities()
            .then((universities) => {
              this.universities = universities.map(function (item) {
                return {name: item['Institution_Name'],
                        id: item['_id']};
              });
            }
        );
        } else {
          alert('Invalid user or your session has expired. Kindly login.');
          this.router.navigate(['login']);
        }
      });
  }

  getProfile() {
    this.propertyService
      .profile()
      .then(user =>
        this.user = user);
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
  autocompleteOwnerValueChange(selectedUniversity){
    this.property.university = selectedUniversity.id;
  }


}
