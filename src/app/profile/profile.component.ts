import {Component, Input, OnInit, NgZone} from '@angular/core';
import {User} from '../models/user.model.client';
import {UserServiceClient} from '../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import {USER_ROLE} from "../enums/userRole";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  uploader: FileUploader;
  private title: string;
    constructor(private service: UserServiceClient,
                private router: Router,
                private cloudinary: Cloudinary,
                private zone: NgZone,
                private http: HttpClient,
                private route: ActivatedRoute) {
        this.route.params.subscribe(
        params => this.userId = params['userId']);
  this.responses = [];
  this.title = ''
    }

    user: User = new User();
    enrollments = [];
    isLoggedIn = false;
    isAdmin = false;
    userId;
    isTenant = false;
    isOwner = false;
    role = USER_ROLE;
    ngOnInit() {
        this.service.profile()
            .then(user => {
                if (!user.invalid) {
                    if (user.role === 'Admin' && this.userId!='self') {
                        this.isAdmin = true;
                        this.findUserById()
                    }
                    else{
                      this.user = user;
                      if(user.role===this.role.Tenant){
                        this.isTenant = true;
                      }
                      if(user.role===this.role.Owner){
                        this.isOwner = true;
                      }
                    }
                    this.isLoggedIn = true;
                } else {
                    alert('Invalid user or your session has expired. Kindly login.');
                    this.router.navigate(['login']);
                }
            });

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
        this.user.photoId = resp.public_id
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
    }

    getProfile() {
        this.service
            .profile()
            .then(user =>
                this.user = user);
    }


    updateProfile() {
        if(this.isAdmin){
          this.service
            .updateProfile(this.user)
            .then(() => {
              alert('Profile successfully updated.')
              this.findUserById()
            });
        }
        else {
          this.service
            .updateProfile(this.user)
            .then(() => {
              alert('Profile successfully updated.')
              this.getProfile()
            });
        }
    }

    uploadImage() {

    }

  deleteProfile() {
    this.service
      .deleteProfile(this.user)
      .then(() => {
        if (this.isAdmin) {
          this.router.navigate(['home']);
        }
        else {
          this.router.navigate(['login']);
        }
      })
  }

  findUserById(){
    this.service.findUserById(this.userId)
      .then((user) => this.user = user)
  }



  updateTitle(value: string) {
    this.title = value;
  }

}
