import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing} from './app.routing';

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

@NgModule({
  declarations: [
    AppComponent,
    AddressAutocompleteComponent,
    HomeScreenComponent,
    AutocompleteComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavigationBarComponent

  ],
  imports: [
    BrowserModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    routing
  ],
  providers: [UserServiceClient,
              PropertyServiceClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
