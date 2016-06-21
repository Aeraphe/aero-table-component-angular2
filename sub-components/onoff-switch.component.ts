import {Component,Input,EventEmitter,Output} from 'angular2/core'


export interface IOnOffSwitchComponent{

    state:boolean;
    trId:number;
    tdId:number;

}

@Component({

selector:'speed-onoff-switch',
template: `
<div class="switch" styles="width:54px"  >
 <div class="onoffswitch" styles="width:54px" >                         
   <input [checked]="data.state"  id="{{data.tdId}}" class="onoffswitch-checkbox" name="status" type="checkbox" >
      <label  (click)="changeState()" class="onoffswitch-label" for="0-btn">
         <span class="onoffswitch-inner"></span>
         <span class="onoffswitch-switch"></span>
      </label>
 </div>
</div>`
})

export /**
 * OnOffSwitchComponent
 */
class OnOffSwitchComponent {
    
    @Input() data:IOnOffSwitchComponent;
    @Output() clickEvent = new EventEmitter<Object>();
    public state:boolean = true;
    
    constructor(parameters) {

    }
    changeState(){
        this.data.state=!this.data.state;
        this.clickEvent.emit(this.data);
    }



}

