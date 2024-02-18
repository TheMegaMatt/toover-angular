import { Routes } from "@angular/router";
import { AuthLayoutComponent as AuthShell } from "@shared/layouts/auth-layout/auth-layout.component";
import { AppLayoutComponent as AppShell } from "@shared/layouts/app-layout/app-layout.component";

import { routes as auth } from "@/features/auth/pages/auth.routes";
import { routes as dashboard } from "@/features/dashboard/pages/dashboard.routes";
import { routes as places } from "@/features/places/pages/places.routes";

export const routes: Routes = [
  { path: "", component: AppShell, children: [...dashboard] },
  { path: "places", component: AppShell, children: [...places] },
  { path: "auth", component: AuthShell, children: [...auth] },
];
