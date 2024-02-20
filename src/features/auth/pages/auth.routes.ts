import {Routes} from "@angular/router";

export const routes: Routes = [
    {
        path: "login",
        loadComponent: () => import("./index").then((m) => m.LoginPage),
    },
    {path: "", redirectTo: "login", pathMatch: "full"},
];


