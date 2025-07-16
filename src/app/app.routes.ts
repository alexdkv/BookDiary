import { Routes } from '@angular/router';
import { Home } from './home/home';
import { App } from './app';
import { Login } from './login/login';

export const routes: Routes = [
    {path:'', children:[
        {path:'', redirectTo:'home', pathMatch:'full'},
        {path:'home', component:Home},
        {path:'login', component:Login}
    ]}
    
];
