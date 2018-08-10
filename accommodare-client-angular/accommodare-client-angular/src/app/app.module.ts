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
    HomeOwnerComponent

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
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'hssso26ip', upload_preset: 'wups8v99'}),
    routing
  ],
  providers: [UserServiceClient,
              PropertyServiceClient,
              UniversityServiceClient,
              WishlistServiceClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
