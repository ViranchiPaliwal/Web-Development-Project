import {Routes, RouterModule} from '@angular/router';
import {AddressAutocompleteComponent} from './address-autocomplete/address-autocomplete.component';
import {AutocompleteComponent} from "./autocomplete/autocomplete.component";
import {HomeScreenComponent} from "./home-screen/home-screen.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeScreenComponent},
  {path: 'autocomplete', component: AutocompleteComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeScreenComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', component: HomeScreenComponent},
  {path: '**', component: HomeScreenComponent} // last
];
export const routing = RouterModule.forRoot(appRoutes);
