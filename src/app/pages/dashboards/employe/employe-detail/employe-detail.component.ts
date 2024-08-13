import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType } from './chartjs.model';
import { ServiceEq } from 'src/app/core/models/ServiceEq';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/User.service';
import { lineAreaChart, lineBarChart } from './data';
import { CompetenceService } from 'src/app/core/services/competence.service';
import { Competence } from 'src/app/core/models/Competence';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobPosition } from 'src/app/core/models/JobPosition';


@Component({
  selector: 'app-employe-detail',
  templateUrl: './employe-detail.component.html',
  styleUrls: ['./employe-detail.component.scss']
})
export class EmployeDetailComponent implements OnInit {
  user: User;
  idUser:number;
  // Line Chart
  lineAreaChart: ChartType;
  lineBarChart: ChartType;
  competanceNames: Competence[] = [];

  selectedServiceName: ServiceEq = new ServiceEq(); // Store the selected service name

  posteUser: JobPosition = new JobPosition();
  idPoste:number=null;
  SelcetedPoste: JobPosition = new JobPosition();



  

  constructor(private userService: UserService,private router: Router,private route: ActivatedRoute,private competanceservice:CompetenceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.idUser = +this.route.snapshot.params['id'];
    this.getUserById(this.idUser);
    
    this._fetchData();
  }

  getUserById(id: number): void {
    this.userService.getUserById(id).subscribe((res:User) => {
      this.user = res;
      if(this.user){
      
      this.userService.getServiceEqByUserId(this.user.id).subscribe((serviceEq: ServiceEq) => {
        this.user.serviceEq = serviceEq; // Associate serviceEq with the user
        this.selectedServiceName =this.user.serviceEq;

        console.log(`Service Eq for User ID ${this.user.id}:`, serviceEq);
      });
      this.userService.getJobPositionForUser(this.user.id).subscribe((job : JobPosition)=>{
        if(job){
        this.posteUser=job;
        this.idPoste=job.id;
        this.SelcetedPoste=job;
        this.competanceNames=job.competencesRequises;
      }
        
      })
      
      console.log(this.user)
      console.log(res)
      console.log(this.user.serviceEq?.nom)
    }
    
    }, error => {
      // Handle any errors that occur during the request
      console.error("Error loading employe:", error);
    });
    
  }
 
  private _fetchData() {
    // Line Chart data
    this.lineAreaChart = lineAreaChart;
    // Bar Chart data
    this.lineBarChart = lineBarChart;
   
  }
   /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    
    this.modalService.open(content, { size: 'lg', centered: true });
  }


}
