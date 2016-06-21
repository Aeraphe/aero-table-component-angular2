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
    var OnOffSwitchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let OnOffSwitchComponent = class OnOffSwitchComponent {
                constructor(parameters) {
                    this.clickEvent = new core_1.EventEmitter();
                    this.state = true;
                }
                changeState() {
                    this.data.state = !this.data.state;
                    this.clickEvent.emit(this.data);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], OnOffSwitchComponent.prototype, "data", void 0);
            __decorate([
                core_1.Output(), 
                __metadata('design:type', Object)
            ], OnOffSwitchComponent.prototype, "clickEvent", void 0);
            OnOffSwitchComponent = __decorate([
                core_1.Component({
                    selector: 'speed-onoff-switch',
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
                }), 
                __metadata('design:paramtypes', [Object])
            ], OnOffSwitchComponent);
            exports_1("OnOffSwitchComponent", OnOffSwitchComponent);
        }
    }
});
//# sourceMappingURL=onoff-switch.component.js.map