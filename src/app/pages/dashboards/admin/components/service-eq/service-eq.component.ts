import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './advanced.model';


import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective, SortEvent } from './advanced-sortable.directive';
import { Router } from '@angular/router';
import { ServiceEq } from 'src/app/core/models/ServiceEq';
import { User } from 'src/app/core/models/User';
import { ServiceEqService } from 'src/app/core/services/ServiceEq.service';
import { UserService } from 'src/app/core/services/User.service';



@Component({
  selector: 'app-service-eq',
  templateUrl: './service-eq.component.html',
  styleUrls: ['./service-eq.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})
export class ServiceEqComponent implements OnInit {
    // bread crum data
    breadCrumbItems: Array<{}>;
    // Table data
    tableData: ServiceEq[] = [];
    tableDataEmploye: User[] = [];
    sortField: string = '';
  sortOrder: boolean = true; // true for ascending, false for descending

    public selected: any;
    hideme: boolean[] = [];
    tables$: Observable<Table[]>;
    tablesemp$: Observable<Table[]>;
    total$: Observable<number>;
    editableTable: any;
  
    @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
    public isCollapsed = true;
  
    constructor(public service: AdvancedService,private serviceEqservice: ServiceEqService ,private userservice: UserService,
      private router: Router) {
      this.tables$ = this.service.tables$;
      this.total$ = service.total$;
    }

   
  
    ngOnInit() {
      this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Advanced Table', active: true }];
      /**
       * fetch data
       */
      this.getAllEquipes();
     // this.getAllEmployes();
    }
  
    changeValue(i) {
      this.hideme[i] = !this.hideme[i];
    }
  
  
    /**
     * fetches the table value
     */
    getAllEquipes() {
      
      this.serviceEqservice.getAllServiceEqs().subscribe((res) => {
        this.tableData = res;
        console.log(res)
        this.service.setSearchData(this.tableData); // Call a method to update the search data in the service
        this._fetchData();
      });
    }
    getAllEmployes() {
      this.userservice.getAllUsers().subscribe((res) => {
        //sthis.tableDataEmploye = res;

        // Ensure chefEquipe is prioritized
    this.tableDataEmploye = res.sort((a, b) => {
      // Ensure chefEquipe is at the top
      if (a.type === "CHEF_EQUIPE" && b.type !== "CHEF_EQUIPE") {
        return -1;
      } else if (a.type !== "CHEF_EQUIPE" && b.type === "CHEF_EQUIPE") {
        return 1;
      }

      // Optionally, apply additional sorting logic if needed
      // For example, sorting alphabetically by name
      return a.nom && b.nom ? a.nom.localeCompare(b.nom) : 0;
    });
        
        
        //this.service.setSearchData(this.tableDataEmploye); // Call a method to update the search data in the service
        //this._fetchData();
      });
    }
     /**
   * fetches the table value
   */
  _fetchData() {
    //this.tableData = tableData;
    //this.editableTable = editableTable;
    for (let i = 0; i <= this.tableData.length; i++) {
      this.hideme.push(true);
    }
  }

    
  
    /**
     * Sort table data
     * @param param0 sort the column
     *
     */
    onSort({ column, direction }: SortEvent) {
      // resetting other headers
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
      this.service.sortColumn = column;
      this.service.sortDirection = direction;
    }

    onSortemp(field: string) {
      this.sortField = field;
      this.sortOrder = !this.sortOrder; // Inverse l'ordre de tri
    
      // Nous n'avons pas besoin d'appeler sortedEmployees ici car il est appelé dans le modèle HTML
      // via le *ngFor sur les employés triés
    }
    
    sortedEmployees(employees: any[]): any[] {
      if (!employees) return [];
    
      return employees.sort((a, b) => {
        let valueA: any = a[this.sortField] !== undefined && a[this.sortField] !== null ? a[this.sortField] : '';
        let valueB: any = b[this.sortField] !== undefined && b[this.sortField] !== null ? b[this.sortField] : '';
    
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortOrder ? valueA - valueB : valueB - valueA;
        } else {
          valueA = valueA.toString().toLowerCase();
          valueB = valueB.toString().toLowerCase();
          if (valueA < valueB) return this.sortOrder ? -1 : 1;
          if (valueA > valueB) return this.sortOrder ? 1 : -1;
          return 0;
        }
      }).filter(emp => emp.type !== 'CHEF_EQUIPE'); // Exclure le chef d'équipe de la liste triée
    }
    
  
}
