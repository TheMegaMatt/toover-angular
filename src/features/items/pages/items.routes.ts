import {Routes} from "@angular/router";
export const routes: Routes = [
    { path: '', loadComponent: () => import('./item-list/item-list.page').then((m) => m.ItemListPage) },
    { path: 'create', loadComponent: () => import('./item-create/item-create.page').then((m) => m.ItemCreatePage) },
    { path: ':id/edit', loadComponent: () => import('./item-edit/item-edit.page').then((m) => m.ItemEditPage) },
    { path: ':id', loadComponent: () => import('./item-detail/item-detail.page').then((m) => m.ItemDetailPage) },
];
