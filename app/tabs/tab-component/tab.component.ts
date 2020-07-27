import { Component, Input, ContentChildren, AfterContentInit, TemplateRef, QueryList } from '@angular/core';
import TabContentComponent from './tab-elements/tab-content.component';
      
@Component({
    selector: 'tab',
    templateUrl: `tab.component.html`
})
export default class TabComponent  implements AfterContentInit { 

 @ContentChildren(TabContentComponent, {read: TemplateRef})
 componentsList: QueryList<TemplateRef>;
 selectedComponent: TemplateRef;

 ngAfterContentInit() {
   console.log(this.componentsList);
   this.selectedComponent = this.componentsList[0];
   console.log(this.selectedComponent, this.componentsList);
 }
}