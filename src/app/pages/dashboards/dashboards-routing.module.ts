import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceEqComponent } from './admin/components/service-eq/service-eq.component';
import { EmployeComponent } from './admin/components/employe/employe-list/employe.component';
import { AddEmployeComponent } from './admin/components/employe/add-employe/add-employe.component';
import { EmployeDetailComponent } from './employe/employe-detail/employe-detail.component';
import { ProfilComponent } from './chefdequipe/profil/profil.component';
import { ServiceEqDetailComponent } from './chefdequipe/service-eq-detail/service-eq-detail.component';
import { PosteComponent } from './admin/poste/poste.component';



const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: 'serviceEq', component: ServiceEqComponent },
      { path: 'employe', component: EmployeComponent },
      { path: 'addempl', component: AddEmployeComponent },
      { path: 'addempl/:id', component: AddEmployeComponent },
      { path: 'poste', component: PosteComponent },
      { path: '', redirectTo: 'serviceEq', pathMatch: 'full' } // Redirect to default route if none specified
    ]
  },
  {
    path: 'employe',
    children: [
      { path: 'profile/:id', component: EmployeDetailComponent },
      { path: '', redirectTo: 'profile/:id', pathMatch: 'full' } // Redirect to default route if none specified
    ]
  },
  {
    path: 'chefdequipe',
    children: [
      { path: 'profile/:id', component: ProfilComponent },
      { path: 'serviceEq/:id', component: ServiceEqDetailComponent },
      { path: '', redirectTo: 'profile/:id', pathMatch: 'full' } // Redirect to default route if none specified
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
