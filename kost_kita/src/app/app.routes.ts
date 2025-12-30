import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { Login } from './login/login';
import { Register } from './register/register';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { Detail } from './detail/detail';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'about',
    component: About,
    title: 'About Page',
  },
  {
    path: 'profile',
    component: Profile,
    title: 'Profile Page',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: Login,
    title: 'Login Page',
  },
  {
    path: 'register',
    component: Register,
    title: 'Register Page',
  },
  {
    path: 'contact',
    component: Contact,
    title: 'Contact Page',
  },
  {
    path: 'detail/:id',
    component: Detail,
    title: 'Detail Kos Page',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
