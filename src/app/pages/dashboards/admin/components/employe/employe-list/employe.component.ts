import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/User.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {

  Users: User[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5; // Nombre d'éléments par page
  totalItems: number = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: User[]) => {
      console.log(res);
      this.Users = res;
      this.filterEmployees(); // Filtrer les utilisateurs de type EMPLOYE
    });
  }

  filterEmployees() {
    this.Users = this.Users.filter(user => user.type === "EMPLOYE");
    this.totalItems = this.Users.length;
  }
  addEmploye() {
    this.router.navigate(['/addempl']); // Navigue vers le composant Employe pour ajouter un nouvel employé
  }

  editEmploye(employe: User) {
    this.router.navigate(['/addempl', employe.id]); // Navigue vers le composant Employe pour mettre à jour l'employé
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

  deleteEmploye(id: number){
    this.userService.deleteUser(id).subscribe( (data) => {
      console.log(data);
      this.getAllUsers();
    })
  }

}
