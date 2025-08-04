import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { App } from './app';
import { Login } from './features/auth/login/login';
import { UserDetails } from './features/user-details/user-details';
import { PageNotFound } from './shared/components/page-not-found/page-not-found';
import { BookDetails } from './features/book-details/book-details';
import { Register } from './features/auth/register/register';
import { AddBook } from './features/add-book/add-book';
import { EditBook } from './features/edit-book/edit-book';
import { BookResolver } from './core/resolvers/book.resolver';
import { Discover } from './features/discover/discover';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { PageOwnerGuard } from './core/guards/page.owner.guard';
import { EditBookUserGuard } from './core/guards/edit.book.guard';

export const routes: Routes = [
    {path:'', children:[
        {path:'', redirectTo:'home', pathMatch:'full'},
        {path:'home', component:Home},
        {path:'user/:id', redirectTo:(route) => `user/${route.params['id']}/books`, pathMatch:'full'},
        {path:'user/:id/books', component: UserDetails, canActivate: [AuthGuard, PageOwnerGuard]},
        {path:'book/:id', component:BookDetails, resolve:{book: BookResolver}},
        {path:'book/addBook/user/:id', component:AddBook, canActivate: [AuthGuard, PageOwnerGuard]},
        {path:'book/update/:id', component:EditBook, resolve:{book: BookResolver}, canActivate: [AuthGuard, EditBookUserGuard] },
        {path:'discover', component: Discover, canActivate: [AuthGuard]}
    ]},
    {path:'login', component:Login, canActivate: [GuestGuard]},
    {path:'register', component:Register, canActivate: [GuestGuard]},
    {path:'**', component: PageNotFound}
    
];
