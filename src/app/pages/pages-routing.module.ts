import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceEqComponent } from './dashboards/admin/components/service-eq/service-eq.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
 
  { path: 'dashboard', component: ServiceEqComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
