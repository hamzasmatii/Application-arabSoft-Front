import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceEq } from 'src/app/core/models/ServiceEq';
import { User } from 'src/app/core/models/User';
import { ServiceEqService } from 'src/app/core/services/ServiceEq.service';
import { UserService } from 'src/app/core/services/User.service';

import { ChartType } from './apex.model';
import { dashedLineChart} from './data';

@Component({
  selector: 'app-service-eq-detail',
  templateUrl: './service-eq-detail.component.html',
  styleUrls: ['./service-eq-detail.component.scss']
})
export class ServiceEqDetailComponent implements OnInit {
  id:number;
  serviceEq:ServiceEq=new ServiceEq();
  TableEmployees: User[] = [];


  //dashline 
  dashedLineChart: ChartType;



  constructor(private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router,private serviceEqservice: ServiceEqService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.LoadService(this.id)
    this._fetchData();
  }

  LoadService(id:number){
    this.serviceEqservice.getServiceEqById(id).subscribe((res:ServiceEq)=>{
      this.serviceEq=res;
      console.log(this.serviceEq)
      if(this.serviceEq.employes.length > 0){
        this.getUsersByServiceEqId(res.id)

      }else{
        this.TableEmployees=[]
      }
    })
  }

  getUsersByServiceEqId(eqId: number): void {
    this.userservice.findUsersByServiceEqId(eqId).subscribe({
      next: (data: User[]) => {
        this.TableEmployees = data;
        console.log('Users:', this.TableEmployees);
  
        
        
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  employeDetails(id: number){
    this.router.navigate(['/employe/profile/', id]);
  }

  private _fetchData() {
    this.dashedLineChart = dashedLineChart;
   
  }


}
