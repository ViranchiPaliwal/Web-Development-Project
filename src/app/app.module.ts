import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing} from './app.routing';
import {FileUploadModule} from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { AddressAutocompleteComponent } from './address-autocomplete/address-autocomplete.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {UserServiceClient} from "./services/user.service.client";
import {PropertyServiceClient} from "./services/property.service.client";
import { OwnerListingComponent } from './owner-listing/owner-listing.component';
import {UniversityServiceClient} from "./services/university.service.client";
import { HomeTenantComponent } from './home-tenant/home-tenant.component';
import { HomeOwnerComponent } from './home-owner/home-owner.component';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import {HttpClientModule} from "@angular/common/http";
import {WishlistServiceClient} from "./services/wishlist.service.client";
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import {InviteServiceClient} from "./services/invite.service.client";
import { OwnerPropertyDetailComponent } from './owner-property-detail/owner-property-detail.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TenantWishlistComponent } from './tenant-wishlist/tenant-wishlist.component';
import { OwnerInvitesComponent } from './owner-invites/owner-invites.component';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  declarations: [
    AppComponent,
    AddressAutocompleteComponent,
    HomeScreenComponent,
    AutocompleteComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavigationBarComponent,
    OwnerListingComponent,
    HomeTenantComponent,
    HomeOwnerComponent,
    PropertyDetailComponent,
    OwnerPropertyDetailComponent,
    ViewProfileComponent,
    HomeAdminComponent,
    TenantWishlistComponent,
    OwnerInvitesComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    NgbModule.forRoot(),
    CloudinaryModule.forRoot(cloudinaryLib, {
      cloud_name: 'hssso26ip',
      upload_preset: 'wups8v99'
    }),
    routing
  ],
  providers: [UserServiceClient,
              PropertyServiceClient,
              UniversityServiceClient,
              InviteServiceClient,
              WishlistServiceClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
