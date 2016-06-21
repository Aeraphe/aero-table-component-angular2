import {Component, OnInit, Input, EventEmitter, ViewChild, QueryList, AfterViewInit, Output, OnChanges, SimpleChange} from 'angular2/core';
import {IAeroTableDataColumn, IAeroTableDataRow, IAeroRow} from './aero-table.interface.component';
import {Observable} from 'rxjs/Observable';
import {OnOffSwitchComponent} from './sub-components/onoff-switch.component';
import {AeroTableFilterComponent} from './sub-components/aero-table-filter.component';
import {AeroPagination} from './sub-components/aero-table-pagination.component';

@Component({

    selector: 'aero-table',
    template: `    

<aero-table-filter *ngIf="AeroTableOptions.showFilters" (filterEvent)="getFiltredData($event)" [filterColumnOptions]="aeroColumns" [pageRecords]="recordsPerPage" [dataForFilter]="dataForFilterCompoent">
</aero-table-filter>

<div *ngIf="!showAeroTable"><div class="alert alert-info" role="alert">{{showSearchRecordMessage}}</div></div>
<div *ngIf="showAeroTable" class="row">
<div class="col-lg-12">
<table class=" table table-stripped default  " >
    <thead>
        <tr style="font-size:12px">
            <th *ngIf="AeroTableOptions.showItem">
             Item
            </th>
            <th   *ngFor="let thItem of aeroColumns"  id="th-{{thItem.id}}" class="{{thItem.class}}">
             {{thItem.name}}
             <span ></span>
            </th>     
        </tr>
    </thead>
    <tbody>
    <template  ngFor let-group="$implicit"  [ngForOf]="rows" let-i2="index" >
        <tr  style="font-size: 11px; ">
            <td *ngIf="AeroTableOptions.showItem" >
               {{i2+1}}
            </td>
             <td  *ngFor="let item of group.td;let i=index"   id="{{item.tdId}}" class="{{item.tdClass}}">
              <speed-td-content >
               <span (click)="getDataTd({column:i,row:group.tr.id,cell:item.tdId,cellValue:item.tdContent})"  *ngIf="!item.component">{{item.tdContent}}</span>
               <speed-onoff-switch (clickEvent)="getDataTd($event)"  [data]="{column:i,row:group.tr.id,cell:item.tdId,state:item.componentState}" *ngIf="item.component=='onoff'" ></speed-onoff-switch >
              </speed-td-content>
             </td>
       </tr>
     </template>  
    </tbody>
    <tfoot >
     <tr>
      <td [attr.colspan]="totalColumnsForColspan" >
       <aero-pagination *ngIf="AeroTableOptions.showPagination" (aeroPaginationRowsEvent)="loadDataOnTable($event)" 
         (paginationDataEvent)="totalOfPages=$event" [aeroRowsPagination]="aeroRowsDataPagination"
         [numberOfRecordsPage]="recordsPerPage" *ngIf="pagination"   >
        </aero-pagination>
      </td>
     </tr>
    </tfoot>
</table>
 <div class="pull-right"><small>Aero Table</small></div>
 <div style="display:none">Create By Alberto Aeraph @version 0.1 17-06-2016 </div>
 </div>
</div>
`,
    directives: [OnOffSwitchComponent, AeroPagination, AeroTableFilterComponent]
})

export class AeroTableComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild(OnOffSwitchComponent) on: OnOffSwitchComponent;
    //Data for Aero Table rows
    @Input() @Output() aeroRows: Array<IAeroTableDataRow>;
    //Data for the columns
    @Input() @Output() aeroColumns: Array<IAeroTableDataColumn>;
    //Data pass to pagination component
    @Output() aeroRowsDataPagination: any;
    //Data For Filtred
    @Output() dataForFilterCompoent: any;

    //Event for the clicks on Aero Table td itens
    @Output() aeroEvent = new EventEmitter<Object>();
    //Data recive or not from the pagination Component If component is in use
    public rows: Array<IAeroTableDataRow>;
    //Show all data on Aero Table or pagination the data
    public pagination: boolean = true;
    //Records per page for pagination
    @Input() @Output() recordsPerPage: number = 5;
    //Set attr colspan in pagination
    public totalColumnsForColspan: number;
    public showAeroTable: boolean = true;
    public showSearchRecordMessage: string = 'Nenhum Registro Encontrado';
    @Input() public AeroTableOptions: Object = { showItem: true, showFilters: true, showPagination: true };




    ngOnInit() {

        this.calculateCollSpanForPagination();


    }

    /**
     * This method calculate the collspan for the table footer
     * 
     */
    calculateCollSpanForPagination() {
        if (this.AeroTableOptions.showItem) {
            this.totalColumnsForColspan = this.aeroColumns.length+1;
        } else {
            this.totalColumnsForColspan = this.aeroColumns.length + 2;
        }
    }


    /**
     * This method check the changes on inputs property and 
     * if the aero table recive the aeroRows data it will send 
     * the data to the pagination component 
     * 
     */
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

        this.aeroRowsDataPagination = this.aeroRows;
        this.dataForFilterCompoent = this.aeroRows;


    }

    public getFiltredData(data: any) {

        this.recordsPerPage = data.recordsPerPage;

        if (data.recordsPerPage === 0) {
            this.showAeroTable = false;
        } else {
            this.aeroRowsDataPagination = data.dataFiltred;
            this.showAeroTable = true;
        }

    }


    /**
     * This method check if the user clicks in some td item and create a event
     * whith the item parans
     * The developer can use this event in the component that nested the Aero Table
     * 
     * 
     */
    getDataTd(selectData: Array<any>) {

        this.aeroEvent.emit(selectData);
    }

    /**
     * This method check  if the Aero Pagination Component is in using for how much data will load in Aero Table
     */
    loadDataOnTable(data: any) {
        if (data.length != 0 && data != undefined) {
            if (!this.pagination) {
                console.log('Sem paginação');
                data = this.aeroRows;
            }

            this.rows = data;
        }
    }



    ngAfterViewInit() {


    }

}
