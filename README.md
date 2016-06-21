# aero-table-component-angular2
A Table grid component for angular 2 with subcomponent: Aero Pagination, Aero OnOff Swittch, Aero Filter . 
All css is Bootstrap

This is a Table Grid for Angular 2.

The Table grid can use or not the above subcomponents:

  Aero Pagination
  Aero OnOff Swittch
  Aero Filter

All the css is from Bootstrap.

How to use:
/*
*First import the Files Above
*/
import {AeroTableComponent} from '../aero-table/aero-table.component';
import  {IAeroTableDataColumn,IAeroTableActions,IAeroTableDataRow} from '../aero-table/aero-table.interface.component';

@Component({
  
selector:'speed-list-users',
/*
*Insert in the template the tag above
*/
template:  '<aero-table (aeroEvent)="aeroGetClickEvent($event)" [aeroColumns]="columns" [aeroRows]="tableData"></aero-table>',
/*
*Set the directive
*/
directives: [AeroTableComponent]

})

1 - Define the variable on your component that will import the Aero Table Component.

/**
 * The rows data
 */
@Output() tableData:Array<any>=[];
/**
 * The columns data configuration
 */
@Output()  public columns:Array<IAeroTableDataColumn>=[];



2 - On the ngInti set the columns:


ngOnInit(){

this.columns=[
        {
        id:1, //column id
        class:" ", //css class
        name:"Nome",
        sort:true

    },
  
  ]

}


3 - Create a method on your component for prepar the data for table rows (this.dataTable):

export interface IAeroTableDataRow {

        tr: { id: number };
        td: [{
                tdId: number,
                tdContent?: any,
                tdClass?: string,
                component?: string, //Not Required 
                componentState?: boolean //Not Required 
        }];

}





