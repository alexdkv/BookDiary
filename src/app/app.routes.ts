import { Routes } from '@angular/router';
import { Home } from './home/home';
import { App } from './app';
import { Login } from './login/login';
import { UserDetails } from './user-details/user-details';
import { PageNotFound } from './page-not-found/page-not-found';
import { BookDetails } from './book-details/book-details';
import { Register } from './register/register';
import { AddBook } from './add-book/add-book';
import { EditBook } from './edit-book/edit-book';
import { BookResolver } from './resolvers/book.resolver';
import { Discover } from './discover/discover';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [
    {path:'', children:[
        {path:'', redirectTo:'home', pathMatch:'full'},
        {path:'home', component:Home},
        {path:'user/:id', redirectTo:(route) => `user/${route.params['id']}/books`, pathMatch:'full'},
        {path:'user/:id/books', component: UserDetails, canActivate: [AuthGuard]},
        {path:'book/:id', component:BookDetails, resolve:{book: BookResolver}, canActivate: [AuthGuard]},
        {path:'book/addBook/user/:id', component:AddBook, canActivate: [AuthGuard]},
        {path:'book/update/:id', component:EditBook, resolve:{book: BookResolver}, canActivate: [AuthGuard] },
        {path:'discover', component: Discover, canActivate: [AuthGuard]}
    ]},
    {path:'login', component:Login, canActivate: [GuestGuard]},
    {path:'register', component:Register, canActivate: [GuestGuard]},
    {path:'**', component: PageNotFound}
    
];
