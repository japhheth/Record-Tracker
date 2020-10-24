import { Routes } from '@angular/router';
import { UserComponent } from 'src/app/pages/user/user.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import {TransactionsComponent} from '../../pages/transactions/transactions.component';
import {AddTransactionComponent} from '../../pages/add-transaction/add-transaction.component';




export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'user', component: UserComponent},
  { path: 'add-transaction', component: AddTransactionComponent}

];
