import {Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {UniversityServiceClient} from "../services/university.service.client";
import {UserServiceClient} from "../services/user.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../models/address.model.client";
import {University} from "../models/university.model.client";
import {Property} from "../models/property.model.client";
import {PropertyServiceClient} from "../services/property.service.client";
import {User} from "../models/user.model.client";
import {FileUploader, FileUploaderOptions, ParsedResponseHeaders} from "ng2-file-upload";
import {Cloudinary} from "@cloudinary/angular-5.x";
import {HttpClient} from "@angular/common/http";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs/index";
import {FormControl} from "@angular/forms";
import {USER_ROLE} from "../enums/userRole";

@Component({
  selector: 'app-home-owner',
  templateUrl: './home-owner.component.html',
  styleUrls: ['./home-owner.component.css']
})
export class HomeOwnerComponent implements OnInit {
  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  uploader: FileUploader;
  constructor(private propertyService: PropertyServiceClient,
              private userService: UserServiceClient,
              private universityService: UniversityServiceClient,
              private cloudinary: Cloudinary,
              private zone: NgZone,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
     this.route.params.subscribe(
    params => this.propertyId = params['propertyId']);
    this.responses = [];
    this.propertyTypes = ["Apartment", "House"]
    this.availTypes = ["Entire place", "Private Room", "Shared Room"]
  }

  @ViewChild('autocomplete') autocomplete: any;

  propertyId
  autocompleter;
  propertyTypes
  university
  universities: University[] = []
  address
  property: Property = new Property()
  availTypes
  addressForm
  isNew = true
  user: User = new User();
  myControl = new FormControl();
  filteredOptions: Observable<University> = new Observable<University>();
  isLoggedIn = false
  isAnonymous
  isTenant = false
  isOwner = false
  role = USER_ROLE
  title
  state
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
      this.state = this.addressForm.administrative_area_level_1
      this.property.address.city = this.addressForm.locality
      this.property.address.state = this.addressForm.administrative_area_level_1
      this.property.address.zip = this.addressForm.postal_code

    });

    this.userService.profile()
      .then(user => {
        if (!user.invalid&&user.role!=this.role.Tenant) {
          this.user = user;
          this.isLoggedIn = true;
          if(user.role===this.role.Owner){
            this.isOwner = true;
          }
        } else {
          alert('Invalid user or your session has expired. Kindly login.');
          this.router.navigate(['login']);
        }
      });

    if(this.propertyId!=='new'){
      this.propertyService.findPropertyById(this.propertyId)
        .then((property) => {
          this.property = property
          this.isNew = false;
          this.university = property.university
            var control = <any> this.myControl
          control._onChange[0](this.university.Institution_Name)
        });
    }

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
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      let tags = 'profilephotos';
      if (this.user.username) {
        form.append('context', `photo=${this.user.username}`);
        tags = `profilephotos,${this.title}`;
      }
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'profilephotos');
      // Add custom tags
      form.append('tags', tags);
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {

      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      var resp = JSON.parse(response)
      this.property.photoId.push(resp.public_id)
      upsertResponse(
        {
          file: item.file,
          status,
          data: resp
        }
      );
    }

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );

    this.filteredOptions = <any> this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): object[] {
    const filterValue = value.toLowerCase();

    return this.universities.filter(option => {
      if (option.name.toLowerCase().includes(filterValue)) {
        return option;
      }
    })
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
        this.router.navigate(['listing/self'])
      );
  }

  update() {
    this.propertyService.updateProperty(this.property)
      .then(() =>
          this.propertyService.findPropertyById(this.propertyId)
            .then((property) => this.property = property)
      );
  }

  delete() {
    var prop = <any>this.property
    this.propertyService.deleteProperty(prop._id)
      .then(() =>
        this.router.navigate(['listing/self'])
      );
  }

  autocompleteOwnerValueChange(selectedUniversity) {
    this.property.university = selectedUniversity.id;
    this.university = selectedUniversity
  }


}
