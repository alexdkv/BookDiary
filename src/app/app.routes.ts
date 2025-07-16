import { Routes } from '@angular/router';
import { Home } from './home/home';
import { App } from './app';
import { Login } from './login/login';
import { UserDetails } from './user-details/user-details';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
    {path:'', children:[
        {path:'', redirectTo:'home', pathMatch:'full'},
        {path:'home', component:Home},
        {path:'login', component:Login},
        {path:'user/:id', redirectTo:(route) => `user/${route.params['id']}/books`, pathMatch:'full'},
        {path:'user/:id/books', component: UserDetails}
    ]},
    {path:'**', component: PageNotFound}
    
];
