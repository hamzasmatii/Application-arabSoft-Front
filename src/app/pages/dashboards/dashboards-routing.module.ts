import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceEqComponent } from './admin/components/service-eq/service-eq.component';
import { EmployeComponent } from './admin/components/employe/employe.component';
import { ChefDequipeComponent } from './admin/components/chef-dequipe/chef-dequipe.component';



const routes: Routes = [
  
    
    {path: 'serviceEq', 
        component: ServiceEqComponent
    },
    {path: 'employe', 
        component: EmployeComponent
    },
    {path: 'chefdequipe', 
        component: ChefDequipeComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
