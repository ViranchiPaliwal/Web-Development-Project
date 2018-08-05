import {Routes, RouterModule} from '@angular/router';
import {AddressAutocompleteComponent} from './address-autocomplete/address-autocomplete.component';
const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: AddressAutocompleteComponent},
    {path: '**', component: AddressAutocompleteComponent} // last
];
export const routing = RouterModule.forRoot(appRoutes);
