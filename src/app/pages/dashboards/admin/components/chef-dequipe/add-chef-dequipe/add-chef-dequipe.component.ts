import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceEq } from 'src/app/core/models/ServiceEq';
import { User } from 'src/app/core/models/User';
import { UserType } from 'src/app/core/models/UserType';
import { CompetenceService } from 'src/app/core/services/competence.service';
import { JobPositionService } from 'src/app/core/services/JobPosition.service';
import { ServiceEqService } from 'src/app/core/services/ServiceEq.service';
import { UserService } from 'src/app/core/services/User.service';

@Component({
  selector: 'app-add-chef-dequipe',
  templateUrl: './add-chef-dequipe.component.html',
  styleUrls: ['./add-chef-dequipe.component.scss']
})
export class AddChefDequipeComponent implements OnInit {

  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean;
  competanceData: FormGroup;

  currentChefdequipe: User = new User();
 
  equipe:ServiceEq[]=[];
  serviceChefDequipe:ServiceEq=new ServiceEq();
  deleteChef:boolean=false;


  selectedServiceName: ServiceEq = new ServiceEq(); // Store the selected service name


  isEditMode: boolean = false;
  id:number;




constructor(public formBuilder: FormBuilder, private modalService: NgbModal,private fb: FormBuilder,private userService: UserService,
  private route: ActivatedRoute,
  private router: Router,private jobpositionService:JobPositionService,private serviceEqservice: ServiceEqService) {
  this.competanceData = this.fb.group({
    competanceValue: this.fb.array([]),
  });
 }

  ngOnInit(): void {
    /**
     * Type validation form
     */
   this.typeValidationForm = this.formBuilder.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    mdp: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    digits: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    number: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    alphanum: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    textarea: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmpwd: ['', Validators.required]
  });

  this.id = this.route.snapshot.params['id'];
  if (this.id) {
    this.isEditMode = true;
    this.loadChefdequipe(this.id);
    
  }
  this.getAllEquipes();
  }

  loadChefdequipe(id: number) {
    console.log(this.currentChefdequipe)
    this.userService.getUserById(id).subscribe((res:User) => {
      this.currentChefdequipe = res;
      this.serviceEqservice.getServiceEqByChefId(this.currentChefdequipe.id).subscribe((serviceEq: ServiceEq) => {
        this.currentChefdequipe.chefEquipeService = serviceEq; // Associate serviceEq with the user
        this.selectedServiceName =serviceEq;
        this.currentChefdequipe.chefEquipeService=serviceEq

        console.log(`Service Eq for User ID ${this.currentChefdequipe.id}:`, serviceEq);
      });
      
      console.log(this.currentChefdequipe)
      console.log(res)
    }, error => {
      // Handle any errors that occur during the request
      console.error("Error loading chefdequipee:", error);
    });
  }

  getAllEquipes(): void {
    this.serviceEqservice.getAllServiceEqs().subscribe(
      (res: ServiceEq[]) => {
        this.equipe = res;
        console.log('Equipes:', res);
      },
      error => {
        console.error('Error fetching equipes:', error);
      }
    );
  }

  typeSubmit() {
    this.saveEmploye();
    this.typesubmit = true;
    
  }
  saveEmploye() {
    if (this.isEditMode) {
      this.updateEmploye();
    } else {
      this.addEmploye();
    }
  }
  updateEmploye() {

    
    if(this.selectedServiceName?.id){
      if(this.deleteChef){
        this.selectedServiceName.chefEquipe = null; // Update the selected service name

      }else{
        this.selectedServiceName.chefEquipe= {id:this.currentChefdequipe.id}

      }
        
          
      this.UpadeEquipe(this.selectedServiceName.id,this.selectedServiceName)
    }
    this.userService.updateUser(this.id, this.currentChefdequipe).subscribe((data) => {
      console.log(data)
      this.router.navigate(['/dashboard/admin/chefdequipe']);
    }, error => console.log(error));
    
  }
  addEmploye() {
    this.currentChefdequipe.type=UserType.CHEF_EQUIPE;
    
    
    if(this.selectedServiceName.id){
      this.currentChefdequipe.chefEquipeService = this.selectedServiceName;
      
    }
    
    
    this.userService.addUser(this.currentChefdequipe).subscribe((res:User) => {
       
       
      if(this.selectedServiceName?.id){
        this.selectedServiceName.chefEquipe= {id:res.id}
        this.UpadeEquipe(this.selectedServiceName.id,this.selectedServiceName)

     }
  
    
      this.router.navigate(['/dashboard/admin/chefdequipe']);
    });
  }

  selectService(service: ServiceEq): void {
    this.deleteChef=false;
    this.currentChefdequipe.chefEquipeService=service;

    this.selectedServiceName = service; // Update the selected service name
    console.log('Selected Service:', this.selectedServiceName); // Optional: Log the selected service name
  }
  DontselectService(): void {
    this.deleteChef=true;
    this.currentChefdequipe.chefEquipeService=null
    this.selectedServiceName.chefEquipe = null; // Update the selected service name
    console.log('Selected Service:', this.selectedServiceName); // Optional: Log the selected service name
  }

  get type() {
    return this.typeValidationForm.controls;
  }
  cancelBut(){
    this.router.navigate(['/dashboard/admin/chefdequipe']);
  }

  UpadeEquipe(id:number,serviceeq : ServiceEq){

    this.serviceEqservice.updateServiceEq(id,serviceeq).subscribe((res:ServiceEq)=>{
      console.log("updaaaateee",res);
    })
  }

   

}
