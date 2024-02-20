import {Routes} from "@angular/router";
export const routes: Routes = [
    { path: '', loadComponent: () => import('./employee-list/employee-list.page').then((m) => m.EmployeeListPage) },
    { path: 'create', loadComponent: () => import('./employee-create/employee-create.page').then((m) => m.EmployeeCreatePage) },
    { path: ':id/edit', loadComponent: () => import('./employee-edit/employee-edit.page').then((m) => m.EmployeeEditPage) },
    { path: ':id', loadComponent: () => import('./employee-detail/employee-detail.page').then((m) => m.EmployeeDetailPage) },
];
