import {Component, Input, EventEmitter, Output, OnChanges, SimpleChange, OnInit} from 'angular2/core';
import {IAeroTableDataColumn, IAeroTableDataRow, IAeroRow} from '../aero-table.interface.component';
@Component({
    selector: 'aero-table-filter',
    template: `
    <div class="row" style="padding-top:25px;padding-bottom:25px;">
  <div class="col-lg-3">
    <div class="input-group">
      <input  style="height:35px;" type="text" (click)="showFilter=false" [(ngModel)]="filterInput" (ngModelChange)="filterCellsDataByColumns()"  placeholder="Buscar na tabela"  class="form-control">
      <div class="input-group-btn" [class.open]="showFilter">
        <button (click)="showFilterOptions()" type="button" class="btn btn-white ">Filtros <span class="caret"></span></button>
        <ul class="dropdown-menu ">
                  <li (click)="applyFilter('clearAll')"><a >Limpar Filtros</a><i class="fa fa-trash " ></i></li>
          <li  *ngFor="let column of filterOptions"><a (click)="applyFilter('columns',column.id)">{{column.name}}</a> <i class="fa  text-danger" [class.fa-check]="column.filter==true"></i></li>

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
    class AeroTableFilterComponent implements  OnInit {
    //Data that will be filter
    @Input() dataForFilter: Array<IAeroTableDataRow>;
    //Number of records per page
    @Input() pageRecords: number = 7;


    @Input() columnsForFilter: Array<IAeroTableDataColumn>;
    /**
     * The filtred result
     * 
     */
    @Output() public filterEvent = new EventEmitter<Object>();


    public totalColumns: number;
    public showFilter: boolean = false;

    public filterInput: string;

    public filterOptions: any;


    constructor(parameters) {

    }

    /**
     * Load data for the filter component
     */
    ngOnInit() {
        this.setFilterColumnsOnInit(this.columnsForFilter);
        this.totalColumns = this.columnsForFilter.length;

    }
    /**
     * Set first column to the standard filter option 
     * on the init of the component
     * and disable other filters
     */
    setFilterColumnsOnInit(columns: Array<IAeroTableDataColumn>) {
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


    applyFilter(filter: string, data?: any): void {

        switch (filter) {
            case 'columns':
                this.setfilteredColumn(data);
                break;

            case "clearAll":
                this.clearAllFilters();
                break;
            default:
                break;
        }


    }

    setfilteredColumn(columnId: number): void {

        let options = this.filterOptions.map((item: any) => {
            if (item.id === columnId) {

                item['filter'] = !item.filter;

            }
            return item;
        });
        this.filterOptions = options;
    }


    /**
     * this method clear ao filters and call load data in initial state
     */
    clearAllFilters(): void {

        let options = this.filterOptions.map((item: any) => {


            item['filter'] = false;


            return item;
        });
        this.filterOptions = options;
        this.filterInput = "";
        this.pageRecords = 7;
        this.filterCellsDataByColumns();

    }

    /**
* This method will get the input data dataForFilter and loop from it 
* checking if the tdValue value correspond the filterInput string
* and return a Array of Objects with the result
* 
*/
    public filterCellsDataByColumns(): void {
        var filterResult: Array<any> = [];


        //Check the filter input string
        if (this.filterInput && this.filterInput.length > 0) {
            //Map the filtred data to new object
            this.dataForFilter.map((item: any) => {
                let newObject: Array<IAeroTableDataRow>;
                let data: any = item.cell;
                //Creat a Array for store the coluns
                var columnsId: Array<number> = [];
                //Macth the string column by column
                for (let column of this.filterOptions) {

                    if (column.filter && data[column.id - 1].value != null && data[column.id - 1].value != undefined && typeof data[column.id - 1].value === "string") {
                        //Set a regex for macth the string
                        let re = new RegExp(this.filterInput, 'gi');
                        if (data[column.id - 1].value.match(re)) {
                            //Create the new object whith the filtred data
                            filterResult.push({ row: item.row, cell: item.cell });

                        }


                    }
                }


            })
            //Remove duplicates resulting from the match over mult columns 
            let dataPrepared = this.removeDuplicates(filterResult);
            let filterObject: Object = { recordsPerPage: dataPrepared.recordNumber, dataFiltred: dataPrepared.data };
            this.filterEvent.emit(filterObject);

        } else {

            let filterObject: Object = { recordsPerPage: this.pageRecords, dataFiltred: this.dataForFilter };
            this.filterEvent.emit(filterObject);


        }


    }

    /**
     * This method removes the duplicates records return from the filter match
     * from mult columns'
     */
    removeDuplicates(filtredData: Array<IAeroTableDataRow>) {
        var filterDataPrepared: Array<any> = [];
        var row: Array<number> = [];
        var records: number = 0;
        filtredData.forEach((item: any) => {
            let data: any = item.row;

            //Get the firs record
            if (row.length == 0) {
                //Save the row id fro compare
                row.push(data.id);
                //Put the first record in the new array
                filterDataPrepared.push({ row: item.row, cell: item.cell });
                //Calculate the records per page for show all records ate once in Aero table
                records++;

            } else {
                //Get the next records and compare whit the next records
                var rowCount = 0;
                //Set a flag for check if the record is uniq
                var uniq: number = 0;
                while (rowCount < row.length && uniq == 0) {
                    if (row[rowCount] == data.id) {
                        uniq = 1;

                    }
                    rowCount++;

                }
                //If the flag return 0 value insert the record in the new array<Object>
                if (uniq === 0) {

                    row.push(data.id);
                    filterDataPrepared.push({ row: item.row, cell: item.cell });
                    records++;
                }

            }


        })//--foreach


        return { data: filterDataPrepared, recordNumber: records };
    }

    /**
     * Methos for show or hide the dropdown filter options
     */
    showFilterOptions() {
        this.showFilter = !this.showFilter;
    }



}
