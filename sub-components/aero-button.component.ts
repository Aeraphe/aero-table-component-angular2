import {Component, EventEmitter, Input, Output,OnInit} from 'angular2/core';


@Component({
    selector: 'aero-button',
    template: `
<button type="button" class="btn btn-sm btn-white " (click)="onClickButton()">  
  <span [ngSwitch]="buttonChoice">
   <span *ngSwitchWhen="'edit'" class="glyphicon glyphicon-wrench" aria-hidden="true"></span>
   <span *ngSwitchWhen="'del'" class="glyphicon glyphicon-remove" aria-hidden="true"></span>
   <span *ngSwitchWhen="'plus'" class="glyphicon glyphicon-plus" aria-hidden="true"></span>
    <span *ngSwitchWhen="'ok'" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
    <span *ngSwitchWhen="'upload'" class="glyphicon glyphicon-upload" aria-hidden="true"></span>
    <span *ngSwitchWhen="'download'" class="glyphicon glyphicon-download" aria-hidden="true"></span>
     <span *ngSwitchWhen="'trash'" class="glyphicon glyphicon-trash" aria-hidden="true"></span>
  </span>
</button>

    `
})


/**
 * AeroButtonComponent
 */
export class AeroButtonComponent implements OnInit{

    @Input() data:any;
    @Output() clickEvent = new EventEmitter<Object>();
    public state:boolean = true;
    public buttonChoice:string;

    constructor(parameters) {

    }

    ngOnInit(){
        
      this.buttonChoice = this.data.buttonType;
    }

    onClickButton(){
        this.clickEvent.emit(this.data);
    }

}