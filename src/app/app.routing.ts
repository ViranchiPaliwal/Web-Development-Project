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
import {TenantWishlistComponent} from "./tenant-wishlist/tenant-wishlist.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeScreenComponent},
  {path: 'autocomplete', component: AutocompleteComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:userId', component: ProfileComponent},
  {path: 'viewprofile/:userId', component: ViewProfileComponent},
  {path: 'listing/:userId', component: OwnerListingComponent},
  {path: 'property/:propertyId', component:HomeOwnerComponent},
  {path: 'searchproperty', component:HomeTenantComponent},
  {path: 'wishlist/:tenantId', component:TenantWishlistComponent},
  {path: 'propertydetail/:propertyId', component: PropertyDetailComponent},
  {path: 'owner/property/:propertyId', component: OwnerPropertyDetailComponent},
  {path: '**', component: HomeScreenComponent}
];
export const routing = RouterModule.forRoot(appRoutes);
