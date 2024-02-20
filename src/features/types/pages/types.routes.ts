import {Routes} from "@angular/router";
export const routes: Routes = [
    { path: '', loadComponent: () => import('./index').then((m) => m.TypeListPage) },
    { path: 'create', loadComponent: () => import('./index').then((m) => m.TypeCreatePage) },
    { path: ':id/edit', loadComponent: () => import('./index').then((m) => m.TypeEditPage) },
    { path: ':id', loadComponent: () => import('./index').then((m) => m.TypeDetailPage) },
];
