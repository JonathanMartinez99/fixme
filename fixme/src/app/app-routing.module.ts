import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from './auth/guards/login-activate.guard';
import { LogoutActivateGuard } from './auth/guards/logout-activate.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/welcome', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    canActivate: [LogoutActivateGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'producto',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'usuario',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: '**',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
