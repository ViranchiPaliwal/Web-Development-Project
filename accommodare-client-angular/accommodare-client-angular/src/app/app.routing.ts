import {Routes, RouterModule} from '@angular/router';
import {AddressAutocompleteComponent} from './address-autocomplete/address-autocomplete.component';
import {AutocompleteComponent} from "./autocomplete/autocomplete.component";
import {HomeScreenComponent} from "./home-screen/home-screen.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {OwnerListingComponent} from "./owner-listing/owner-listing.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeScreenComponent},
  {path: 'autocomplete', component: AutocompleteComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeScreenComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'listing', component: OwnerListingComponent},
  {path: 'property/:propertyId', component: PropertyDetailComponent},
  {path: '**', component: HomeScreenComponent}
];
export const routing = RouterModule.forRoot(appRoutes);
