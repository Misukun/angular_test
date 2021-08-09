import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// main component
import { EmployeersListComponent } from './components/employeers-list/employeers-list.component';

const routes: Routes = [
  { path: 'home', component: EmployeersListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
