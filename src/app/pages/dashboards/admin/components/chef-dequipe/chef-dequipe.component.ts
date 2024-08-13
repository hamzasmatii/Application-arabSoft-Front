import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceEq } from 'src/app/core/models/ServiceEq';
import { User } from 'src/app/core/models/User';
import { ServiceEqService } from 'src/app/core/services/ServiceEq.service';
import { UserService } from 'src/app/core/services/User.service';

@Component({
  selector: 'app-chef-dequipe',
  templateUrl: './chef-dequipe.component.html',
  styleUrls: ['./chef-dequipe.component.scss']
})
export class ChefDequipeComponent implements OnInit {

  Users: User[] = [];
  servicesEq : ServiceEq;
  userr:User = new User();
  userServiceEqs: { userId: number, serviceEq: ServiceEq | null }[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5; // Nombre d'éléments par page
  totalItems: number = 0;
  selectedServiceName: ServiceEq = new ServiceEq();

  constructor(private userService: UserService,private serviceEqserice : ServiceEqService ,private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: User[]) => {
      console.log(res);
      this.Users = res;
      this.Users.forEach(user => {
        this.serviceEqserice.getServiceEqByChefId(user.id).subscribe((serviceEq: ServiceEq) => {
          user.chefEquipeService = serviceEq; // Associate serviceEq with the user
          console.log(`Service Eq for User ID ${user.id}:`, serviceEq);
        });
      });
      this.filterChefdequipees(); // Filtrer les utilisateurs de type CHEF_EQUIPE
    });
  }

  filterChefdequipees() {
    this.Users = this.Users.filter(user => user.type === "CHEF_EQUIPE");
    this.totalItems = this.Users.length;
  }
  addChefdequipe() {
    this.router.navigate(['/dashboard/admin/addchefdequipe']); // Navigue vers le composant Chefdequipe pour ajouter un nouvel employé
  }

  editChefdequipe(chefdequipe: User) {
    this.router.navigate(['/dashboard/admin/addchefdequipe/', chefdequipe.id]); // Navigue vers le composant Chefdequipe pour mettre à jour l'employé
  }

  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.Users.slice(start, end);
  }

  setPage(page: number) {
    if (page < 1 || page > Math.ceil(this.totalItems / this.itemsPerPage)) return;
    this.currentPage = page;
  }
  get pages(): number[] {
    return Array(Math.ceil(this.totalItems / this.itemsPerPage)).fill(0).map((_, i) => i + 1);
  }

  deleteChefdequipe(id: number){
    console.log(id)
    this.serviceEqserice.getServiceEqByChefId(id).subscribe(res=>{
      if(res){
        this.selectedServiceName = res
        this.selectedServiceName.chefEquipe = null;
     this.serviceEqserice.updateServiceEq(this.selectedServiceName.id,this.selectedServiceName).subscribe(dataa=>{
      console.log(dataa)
      this.userService.deleteUser(id).subscribe( (data) => {
        console.log(data);
        this.getAllUsers();
      })
    })
   
      }else{
        this.userService.deleteUser(id).subscribe( (data) => {
          console.log(data);
          this.getAllUsers();
        })
      }
      
     
    })
  }
  chefdequipeDetails(id: number){
    this.router.navigate(['/chefdequipe/profile/', id]);
  }

 
}
