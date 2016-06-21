System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var AeroTableFilterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let AeroTableFilterComponent = class AeroTableFilterComponent {
                constructor(parameters) {
                    //Number of records per page
                    this.pageRecords = 7;
                    /**
                     * The filtred result
                     *
                     */
                    this.filterEvent = new core_1.EventEmitter();
                    this.showFilter = false;
                }
                ngOnInit() {
                    this.getFilterColumns(this.filterColumnOptions);
                }
                ngOnChanges(changes) {
                }
                getFilterColumns(columns) {
                    this.filterOptions = columns.map((item) => {
                        let newObject;
                        newObject = item;
                        newObject['filter'] = false;
                        if (item.id === 1) {
                            item['filter'] = true;
                        }
                        return newObject;
                    });
                }
                setFilter(filter, data) {
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
                filterByColumn(columnId) {
                    let options = this.filterOptions.map((item) => {
                        if (item.id === columnId) {
                            item['filter'] = !item.filter;
                        }
                        return item;
                    });
                    this.filterOptions = options;
                }
                clearAllFilter() {
                    let options = this.filterOptions.map((item) => {
                        item['filter'] = false;
                        return item;
                    });
                    this.filterOptions = options;
                    this.filterInput = "";
                    this.pageRecords = 7;
                    this.filterRowsData();
                }
                /**
            * This method will get the input data dataForFilter and loop from it
            * checking if the tdValue value correspond the filterInput string
            * and return a Array of Objects with the result
            *
            */
                filterRowsData() {
                    var filterResult = [];
                    var newRecordsPerPage = 0;
                    if (this.filterInput && this.filterInput.length > 0) {
                        this.dataForFilter.map((item) => {
                            let newObject;
                            let data = item.td;
                            for (let column of this.filterOptions) {
                                if (column.filter && data[column.id - 1].tdContent != null && data[column.id - 1].tdContent != undefined && typeof data[column.id - 1].tdContent === "string") {
                                    let re = new RegExp(this.filterInput, 'gi');
                                    if (data[column.id - 1].tdContent.match(re)) {
                                        filterResult.push({ tr: item.tr, td: item.td });
                                        newRecordsPerPage++;
                                    }
                                }
                            }
                        });
                        let filterObject = { recordsPerPage: newRecordsPerPage, dataFiltred: filterResult };
                        this.filterEvent.emit(filterObject);
                    }
                    else {
                        let filterObject = { recordsPerPage: this.pageRecords, dataFiltred: this.dataForFilter };
                        this.filterEvent.emit(filterObject);
                    }
                }
                showFilterOptions() {
                    this.showFilter = !this.showFilter;
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Array)
            ], AeroTableFilterComponent.prototype, "dataForFilter", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Number)
            ], AeroTableFilterComponent.prototype, "pageRecords", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Array)
            ], AeroTableFilterComponent.prototype, "filterColumnOptions", void 0);
            __decorate([
                core_1.Output(), 
                __metadata('design:type', Object)
            ], AeroTableFilterComponent.prototype, "filterEvent", void 0);
            AeroTableFilterComponent = __decorate([
                core_1.Component({
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
                }), 
                __metadata('design:paramtypes', [Object])
            ], AeroTableFilterComponent);
            exports_1("AeroTableFilterComponent", AeroTableFilterComponent);
        }
    }
});
//# sourceMappingURL=aero-table-filter.component.js.map