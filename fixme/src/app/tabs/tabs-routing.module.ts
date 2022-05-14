import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../products/inicio_tab/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'inicio/:reparados',
        loadChildren: () => import('../products/inicio_tab/tab1.module').then(m => m.Tab1PageModule),
      },
      {
        path: 'favoritos',
        loadChildren: () => import('../products/favoritos_tab/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'subelo',
        loadChildren: () => import('../products/subelo_tab/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
