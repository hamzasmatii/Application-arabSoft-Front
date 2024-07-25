import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobPosition } from 'src/app/core/models/JobPosition';
import { User } from 'src/app/core/models/User';
import { UserType } from 'src/app/core/models/UserType';
import { JobPositionService } from 'src/app/core/services/JobPosition.service';
import { UserService } from 'src/app/core/services/User.service';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent implements OnInit {

  typeValidationForm: FormGroup; // type validation form
    typesubmit: boolean;
    competanceData: FormGroup;

    currentEmploye: User = new User();
    poste: JobPosition = new JobPosition();
    isEditMode: boolean = false;
    id:number;




  constructor(public formBuilder: FormBuilder, private modalService: NgbModal,private fb: FormBuilder,private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,private jobpositionService:JobPositionService) {
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
    this.loadEmploye(this.id);
  }
  }
   /**
   * Returns the type validation form
   */
   get type() {
    return this.typeValidationForm.controls;
  }

  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.saveEmploye();
    this.typesubmit = true;
    
  }

  loadEmploye(id: number) {
    console.log(this.currentEmploye)
    this.userService.getUserById(id).subscribe((res:User) => {
      this.currentEmploye = res;
      console.log(this.currentEmploye)
      console.log(res)
    });
  }

  saveEmploye() {
    if (this.isEditMode) {
      this.updateEmploye();
    } else {
      this.addEmploye();
    }
  }

  addEmploye() {
    this.currentEmploye.type=UserType.EMPLOYE;
    this.userService.addUser(this.currentEmploye).subscribe(() => {
      this.router.navigate(['/employe']);
    });
  }
  cancelBut(){
    this.router.navigate(['/employe']);
  }

  updateEmploye() {
    this.userService.updateUser(this.id, this.currentEmploye).subscribe((data) => {
      this.router.navigate(['/employe']);
    }, error => console.log(error));
  }
   

  
  //poste
  addPoste() {
    this.jobpositionService.addJobPosition(this.poste).subscribe(() => {
      //this.router.navigate(['/employe']);
    });
  }

 

   /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  competancedata(): FormArray {
    return this.competanceData.get('competanceValue') as FormArray;
  }

  competance(): FormGroup {
    return this.fb.group({
      competancenumber: ''
    });
  }
  /**
   * Add competance field in list
   */
  addCompetance() {
    this.competancedata().push(this.competance());
  }
   /**
   * Delete competance field from list
   * @param i specified index
   */
   deleteCompetance(i: number) {
    this.competancedata().removeAt(i);
  }



}


