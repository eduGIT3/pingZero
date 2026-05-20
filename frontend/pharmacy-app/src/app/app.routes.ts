import { Routes } from '@angular/router';
import { AdminProducts } from './pages/admin-products/admin-products';
import { Catalog } from './pages/catalog/catalog';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'catalogo',
    component: Catalog,
  },
  {
    path: 'admin-productos',
    component: AdminProducts,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
