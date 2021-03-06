import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';

const routes: Routes = [
  {
    path: 'detalle/:id',
    loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'notifications/:chats',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'chat/:me/:user',
    loadChildren: () => import('./chat/chat/chat.module').then( m => m.ChatPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
