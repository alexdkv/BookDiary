import { Routes } from '@angular/router';
import { Home } from './home/home';
import { App } from './app';
import { Login } from './login/login';
import { UserDetails } from './user-details/user-details';
import { PageNotFound } from './page-not-found/page-not-found';
import { BookDetails } from './book-details/book-details';
import { Register } from './register/register';
import { AddBook } from './add-book/add-book';

export const routes: Routes = [
    {path:'', children:[
        {path:'', redirectTo:'home', pathMatch:'full'},
        {path:'home', component:Home},
        {path:'user/:id', redirectTo:(route) => `user/${route.params['id']}/books`, pathMatch:'full'},
        {path:'user/:id/books', component: UserDetails},
        {path:'book/:id', component:BookDetails},
        {path:'book/addBook/user/:id', component:AddBook}
    ]},
    {path:'login', component:Login},
    {path:'register', component:Register},
    {path:'**', component: PageNotFound}
    
];
