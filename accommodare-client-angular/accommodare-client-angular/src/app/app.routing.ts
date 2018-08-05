import {Routes, RouterModule} from '@angular/router';
import {WhiteBoardComponent} from './white-board/address-autocomplete.component';
const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: WhiteBoardComponent},
    {path: '**', component: WhiteBoardComponent} // last
];
export const routing = RouterModule.forRoot(appRoutes);
