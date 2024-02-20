import {Routes} from "@angular/router";
export const routes: Routes = [
    { path: '', loadComponent: () => import('./place-list/place-list.page').then((m) => m.PlaceListPage) },
    { path: 'create', loadComponent: () => import('./place-create/place-create.page').then((m) => m.PlaceCreatePage) },
    { path: ':id/edit', loadComponent: () => import('./place-edit/place-edit.page').then((m) => m.PlaceEditPage) },
    { path: ':id', loadComponent: () => import('./place-detail/place-detail.page').then((m) => m.PlaceDetailPage) },
];
