import {Routes} from "@angular/router";

export const routes: Routes = [
    {
        path: "about",
        loadComponent: () => import("./about/about.page").then((m) => m.AboutPage),
    },
    {
        path: '', pathMatch: 'full', redirectTo: '/items'
    }
    // {
    //     path: "",
    //     loadComponent: () => import("./home/home.page").then((m) => m.HomePage),
    // },
];
