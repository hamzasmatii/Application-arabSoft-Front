import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './advanced.model';


import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective, SortEvent } from './advanced-sortable.directive';
import { Router } from '@angular/router';
import { ServiceEqService } from 'src/app/pages/services/ServiceEq.service';
import { ServiceEq } from 'src/app/pages/model/ServiceEq';


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
    tableData: Table[] = [];
    public selected: any;
    hideme: boolean[] = [];
    tables$: Observable<Table[]>;
    total$: Observable<number>;
    editableTable: any;
  
    @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
    public isCollapsed = true;
  
    constructor(public service: AdvancedService,private serviceEqservice: ServiceEqService ,
      private router: Router) {
      this.tables$ = this.service.tables$;
      this.total$ = service.total$;
    }

    settings = {
      columns: {
        id: {
          title: 'ID',
        },
        name: {
          title: 'Full Name',
          filter: {
            type: 'list',
            config: {
              selectText: 'Select...',
              list: [
                { value: 'Glenna Reichert', title: 'Glenna Reichert' },
                { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
                { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
              ],
            },
          },
        },
        email: {
          title: 'Email',
          filter: {
            type: 'completer',
            config: {
              completer: {
                searchFields: 'email',
                titleField: 'email',
              },
            },
          },
        },
      },
    };
  
  
    ngOnInit() {
      this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Advanced Table', active: true }];
      /**
       * fetch data
       */
      this.getAllEquipes();
    }
  
    changeValue(i) {
      this.hideme[i] = !this.hideme[i];
    }
  
  
    /**
     * fetches the table value
     */
    getAllEquipes() {
      this.serviceEqservice.getAllServiceEqs().subscribe((res: ServiceEq[]) => {
        console.log(res);
        this.tableData = res.map(serviceEq => this.mapServiceEqToTable(serviceEq));
        this.service.setSearchData(this.tableData); // Call a method to update the search data in the service
        this._fetchData();
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

    mapServiceEqToTable(serviceEq: ServiceEq): Table {
      return {
        nom: serviceEq.nom,
        chefEquipe: serviceEq.chefEquipe ? serviceEq.chefEquipe.nom : ''
      };
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
}
