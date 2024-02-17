import { Routes } from '@angular/router';
import {AuthLayoutComponent as AuthShell} from "@shared/layouts/auth-layout/auth-layout.component";

import {routes as auth} from '@/features/auth/pages/auth.routes'
import {routes as dashboard} from '@/features/dashboard/pages/dashboard.routes'

import {AppLayoutComponent} from "@shared/layouts/app-layout/app-layout.component";

export const routes: Routes = [
    { path: 'app', component: AppLayoutComponent, children: [...dashboard] },
    { path: 'auth', component: AuthShell, children: [...auth] },
    { path: '',   redirectTo: '/app', pathMatch: 'full' },
];
