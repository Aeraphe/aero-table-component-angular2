export interface IAeroTableDataColumn {

        id: number;
        cssClass: string;
        name: string;
        sort: boolean;
        filter?:boolean;


}

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

export interface IAeroRow {


        id: number;
        value?: any,
        cssClass?: string,
        component?: string, //Not Required 
        componentState?: boolean //Not Required 

}

export interface IAeroTableActions {
        aeroGetClickEvent(event: Object): any;
}