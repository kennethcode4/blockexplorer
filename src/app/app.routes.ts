import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Block } from './pages/block/block';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(c => c.Home) },
  { path: 'block/:blockId', loadComponent: () => import('./pages/block/block').then(c => c.Block) },
  { path: '**', redirectTo: '' },
];
