import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceEqComponent } from './admin/components/service-eq/service-eq.component';
import { ChefDequipeComponent } from './admin/components/chef-dequipe/chef-dequipe.component';
import { EmployeComponent } from './admin/components/employe/employe-list/employe.component';
import { AddEmployeComponent } from './admin/components/employe/add-employe/add-employe.component';



const routes: Routes = [
  
    
    {path: 'serviceEq', 
        component: ServiceEqComponent
    },
    {path: 'employe', 
        component: EmployeComponent
    },
    {path: 'chefdequipe', 
        component: ChefDequipeComponent
    },{path: 'addempl', 
        component: AddEmployeComponent
    },
    {path: 'addempl/:id', 
        component: AddEmployeComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
