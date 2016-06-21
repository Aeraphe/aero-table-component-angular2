export interface IAeroTableDataColumn {

        id: number;
        class: string;
        name: string;
        sort: boolean;


}

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

export interface IAeroRow {


        tdId: number;
        tdContent?: any;
        tdClass?: string;
        component?: string; //Not Required 
        componentState?: boolean; //Not Required 

}

export interface IAeroTableActions {
        aeroGetClickEvent(event: Object): any;
}