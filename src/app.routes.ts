import { Routes } from '@angular/router';
import {AuthLayoutComponent as AuthShell} from "@shared/layouts/auth-layout/auth-layout.component";

import {routes as auth} from '@/features/auth/pages/auth.routes'

export const routes: Routes = [
    { path: 'auth', component: AuthShell, children: [...auth] },
    { path: '',   redirectTo: '/auth', pathMatch: 'full' }
];
