# aero-table-component-angular2
A Table grid component for angular 2 with subcomponent: 
 
 Aero Pagination, 
 Aero OnOff Swittch, 
 Aero Filter . 

All css is from Bootstrap

This is a Table Grid for Angular 2.

The Table grid can use or not the above subcomponents:

Aero Pagination
Aero OnOff Swittch
Aero Filter
Aero Button (New 21/6/2016)


All the css is from Bootstrap.

0 - How to use:

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
        cssClass:" ", //css class
        name:"Nome",
        sort:true
        
        }
  
  ]

}


3 - Create a method on your component for prepar the data for table rows (this.dataTable):

export interface IAeroTableDataRow {

        row: { id: number };
        cell: [{
                id?: number,
                value?: any,
                cssClass?: string,
                component?: string, //Not Required 
                componentState?: boolean //Not Required 
        }];



}





Aero Button Component

This component can be use in Aero Table.
The Aero Button use ngSwitch to select glyphicon icon

On Cell Array of Objecs just define the below properties:

{id:1,value:'',cssClass:'',component:"aero-button",componentOptions:'edit'}

The componentOptions: Define the type of the button