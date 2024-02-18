import {Routes} from "@angular/router";
export const routes: Routes = [
    { path: '', loadComponent: () => import('./place-list/place-list.page').then((m) => m.PlaceListPage) },
];
