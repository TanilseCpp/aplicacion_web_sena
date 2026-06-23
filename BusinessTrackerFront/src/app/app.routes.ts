import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.RegisterPage),
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./pages/statistics/statistics').then((m) => m.Statistics),
  },
  {
    path: 'global-businesses',
    loadComponent: () =>
      import('./pages/global-businesses/global-businesses').then(
        (m) => m.GlobalBusinesses
      ),
  },
  {
    path: 'user-section',
    loadComponent: () =>
      import('./pages/user-section/user-section').then((m) => m.UserSection),
    canActivate: [authGuard],
  },
  {
    path: 'top-businesses',
    loadComponent: () =>
      import('./pages/top-businesses/top-businesses').then(
        (m) => m.TopBusinesses
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile').then((m) => m.ProfilePage),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
