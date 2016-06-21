import {Component, Input, EventEmitter, Output, OnChanges, SimpleChange, OnInit} from 'angular2/core';
import {IAeroTableDataColumn, IAeroTableDataRow, IAeroRow} from '../aero-table.interface.component';
@Component({
    selector: 'aero-table-filter',
    template: `
    <div class="row" style="padding-top:25px;padding-bottom:25px;">
  <div class="col-lg-3">
    <div class="input-group">
      <input  style="height:35px;" type="text" (click)="showFilter=false" [(ngModel)]="filterInput" (ngModelChange)="filterRowsData()"  placeholder="Buscar na tabela"  class="form-control">
      <div class="input-group-btn" [class.open]="showFilter">
        <button (click)="showFilterOptions()" type="button" class="btn btn-white ">Filtros <span class="caret"></span></button>
        <ul class="dropdown-menu ">
                  <li (click)="setFilter('clearAll')"><a >Limpar Filtros</a><i class="fa fa-trash " ></i></li>
          <li  *ngFor="let column of filterOptions"><a (click)="setFilter('columns',column.id)">{{column.name}}</a> <i class="fa  text-danger" [class.fa-check]="column.filter==true"></i></li>

          <li><a href="#">Cressente</a><i class="fa fa-sort-asc " ></i></li>
          <li><a href="#">Decressente</a><i class="fa fa-sort-desc " ></i></li>
        </ul>
      </div><!-- /btn-group -->
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
</div><!-- /.row -->
<style>
.dropdown-menu > li{position:relative;}
.dropdown-menu > li > i{position:absolute;right:15px;top:11px;}
</style>
    `
})

export /**
 * AeroTableFilterComponent
 */
    class AeroTableFilterComponent implements OnChanges, OnInit {
    //Data that will be filter
    @Input() dataForFilter: Array<IAeroTableDataRow>;
    //Number of records per page
    @Input() pageRecords: number = 7;

    @Input() filterColumnOptions: Array<IAeroTableDataColumn>;
    /**
     * The filtred result
     * 
     */
    @Output() public filterEvent = new EventEmitter<Object>();


    public showFilter: boolean = false;

    public filterInput: string;

    public filterOptions: any;


    constructor(parameters) {

    }

    ngOnInit() {
        this.getFilterColumns(this.filterColumnOptions);

    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {


    }


    getFilterColumns(columns: Array<IAeroTableDataColumn>) {
        this.filterOptions = columns.map((item: any) => {
            let newObject: any;
            newObject = item;
            newObject['filter'] = false;
            if (item.id === 1) {
                item['filter'] = true;
            }
            return newObject;

        })



    }

    setFilter(filter: string, data?: any): void {


        switch (filter) {
            case 'columns':
                this.filterByColumn(data);
                break;

            case "clearAll":
                this.clearAllFilter();
                break;
            default:
                break;
        }


    }

    filterByColumn(columnId: number): void {

        let options = this.filterOptions.map((item: any) => {
            if (item.id === columnId) {

                item['filter'] = !item.filter;

            }
            return item;
        });
        this.filterOptions = options;
    }



    clearAllFilter(): void {

        let options = this.filterOptions.map((item: any) => {


            item['filter'] = false;


            return item;
        });
        this.filterOptions = options;
        this.filterInput="";
        this.pageRecords=7;
        this.filterRowsData();
        
    }

    /**
* This method will get the input data dataForFilter and loop from it 
* checking if the tdValue value correspond the filterInput string
* and return a Array of Objects with the result
* 
*/
    public filterRowsData(): void {
        var filterResult: Array<any> = [];
        var newRecordsPerPage: number = 0;
    

        if (this.filterInput && this.filterInput.length > 0) {

            this.dataForFilter.map((item: any) => {
                let newObject: Array<IAeroTableDataRow>;
                let data: any = item.td;


                for (let column of this.filterOptions) {
                    if (column.filter && data[column.id - 1].tdContent != null && data[column.id - 1].tdContent != undefined && typeof data[column.id - 1].tdContent === "string") {

                        let re = new RegExp(this.filterInput, 'gi');
                        if (data[column.id - 1].tdContent.match(re)) {
                            filterResult.push({ tr: item.tr, td: item.td });
                            newRecordsPerPage++;
                        }


                    }
                }


            })

            let filterObject: Object = { recordsPerPage: newRecordsPerPage, dataFiltred: filterResult };
            this.filterEvent.emit(filterObject);

        } else {

            let filterObject: Object = { recordsPerPage: this.pageRecords, dataFiltred: this.dataForFilter };
            this.filterEvent.emit(filterObject);
              

        }


    }

    showFilterOptions() {
        this.showFilter = !this.showFilter;
    }



}
