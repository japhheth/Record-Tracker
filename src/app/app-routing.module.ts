import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserComponent } from './pages/user/user.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'user',
        loadChildren:
          './pages/user/user.component'
      }
    ]
  },
  {
    path: 'add-transaction',
    component: AddTransactionComponent,
    children: [
      {
        path: 'add-transaction',
        loadChildren:
          './pages/add-transaction/add-transaction.component'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
