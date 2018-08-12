import {Routes, RouterModule} from '@angular/router';
import {AddressAutocompleteComponent} from './address-autocomplete/address-autocomplete.component';
import {AutocompleteComponent} from "./autocomplete/autocomplete.component";
import {HomeScreenComponent} from "./home-screen/home-screen.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {OwnerListingComponent} from "./owner-listing/owner-listing.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import {OwnerPropertyDetailComponent} from "./owner-property-detail/owner-property-detail.component";
import {ViewProfileComponent} from "./view-profile/view-profile.component";
import {HomeOwnerComponent} from "./home-owner/home-owner.component";
import {HomeTenantComponent} from "./home-tenant/home-tenant.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeScreenComponent},
  {path: 'autocomplete', component: AutocompleteComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeScreenComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'viewprofile/:username', component: ViewProfileComponent},
  {path: 'listing', component: OwnerListingComponent},
  {path: 'property/:propertyId', component:HomeOwnerComponent},
  {path: 'searchproperty', component:HomeTenantComponent},
  {path: 'wishlist', component:HomeTenantComponent},
  {path: 'propertyy/:propertyId', component: PropertyDetailComponent},
  {path: 'owner/property/:propertyId', component: OwnerPropertyDetailComponent},
  {path: '**', component: HomeScreenComponent}
];
export const routing = RouterModule.forRoot(appRoutes);
