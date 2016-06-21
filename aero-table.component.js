System.register(['angular2/core', './sub-components/onoff-switch.component', './sub-components/aero-table-filter.component', './aero-table-pagination.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, onoff_switch_component_1, aero_table_filter_component_1, aero_table_pagination_component_1;
    var AeroTableComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (onoff_switch_component_1_1) {
                onoff_switch_component_1 = onoff_switch_component_1_1;
            },
            function (aero_table_filter_component_1_1) {
                aero_table_filter_component_1 = aero_table_filter_component_1_1;
            },
            function (aero_table_pagination_component_1_1) {
                aero_table_pagination_component_1 = aero_table_pagination_component_1_1;
            }],
        execute: function() {
            let AeroTableComponent = class AeroTableComponent {
                constructor() {
                    //Event for the clicks on Aero Table td itens
                    this.aeroEvent = new core_1.EventEmitter();
                    //Show all data on Aero Table or pagination the data
                    this.pagination = true;
                    //Records per page for pagination
                    this.recordsPerPage = 5;
                    this.showAeroTable = true;
                    this.showSearchRecordMessage = 'Nenhum Registro Encontrado';
                    this.AeroTableOptions = { showItem: true, showFilters: true, showPagination: true };
                }
                ngOnInit() {
                    this.calculateCollSpanForPagination();
                }
                /**
                 * This method calculate the collspan for the table footer
                 *
                 */
                calculateCollSpanForPagination() {
                    if (this.AeroTableOptions.showItem) {
                        this.totalColumnsForColspan = this.aeroColumns.length + 1;
                    }
                    else {
                        this.totalColumnsForColspan = this.aeroColumns.length + 2;
                    }
                }
                /**
                 * This method check the changes on inputs property and
                 * if the aero table recive the aeroRows data it will send
                 * the data to the pagination component
                 *
                 */
                ngOnChanges(changes) {
                    this.aeroRowsDataPagination = this.aeroRows;
                    this.dataForFilterCompoent = this.aeroRows;
                }
                getFiltredData(data) {
                    this.recordsPerPage = data.recordsPerPage;
                    if (data.recordsPerPage === 0) {
                        this.showAeroTable = false;
                    }
                    else {
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
                getDataTd(selectData) {
                    this.aeroEvent.emit(selectData);
                }
                /**
                 * This method check  if the Aero Pagination Component is in using for how much data will load in Aero Table
                 */
                loadDataOnTable(data) {
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
            };
            __decorate([
                core_1.ViewChild(onoff_switch_component_1.OnOffSwitchComponent), 
                __metadata('design:type', onoff_switch_component_1.OnOffSwitchComponent)
            ], AeroTableComponent.prototype, "on", void 0);
            __decorate([
                core_1.Input(),
                core_1.Output(), 
                __metadata('design:type', Array)
            ], AeroTableComponent.prototype, "aeroRows", void 0);
            __decorate([
                core_1.Input(),
                core_1.Output(), 
                __metadata('design:type', Array)
            ], AeroTableComponent.prototype, "aeroColumns", void 0);
            __decorate([
                core_1.Output(), 
                __metadata('design:type', Object)
            ], AeroTableComponent.prototype, "aeroRowsDataPagination", void 0);
            __decorate([
                core_1.Output(), 
                __metadata('design:type', Object)
            ], AeroTableComponent.prototype, "dataForFilterCompoent", void 0);
            __decorate([
                core_1.Output(), 
                __metadata('design:type', Object)
            ], AeroTableComponent.prototype, "aeroEvent", void 0);
            __decorate([
                core_1.Input(),
                core_1.Output(), 
                __metadata('design:type', Number)
            ], AeroTableComponent.prototype, "recordsPerPage", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], AeroTableComponent.prototype, "AeroTableOptions", void 0);
            AeroTableComponent = __decorate([
                core_1.Component({
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
                    directives: [onoff_switch_component_1.OnOffSwitchComponent, aero_table_pagination_component_1.AeroPagination, aero_table_filter_component_1.AeroTableFilterComponent]
                }), 
                __metadata('design:paramtypes', [])
            ], AeroTableComponent);
            exports_1("AeroTableComponent", AeroTableComponent);
        }
    }
});
//# sourceMappingURL=aero-table.component.js.map