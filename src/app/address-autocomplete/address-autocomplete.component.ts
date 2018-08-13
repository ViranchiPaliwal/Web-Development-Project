import {Component, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
@Component({
  selector: 'app-address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.css']
})
export class AddressAutocompleteComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    this.autocompleter = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */this.autocomplete.nativeElement,
      {types: ['geocode']});
  }

  @ViewChild('autocomplete') autocomplete: any;

  autocompleter;


  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
    geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autocompleter.setBounds(circle.getBounds());
      });
    }
  }
}
