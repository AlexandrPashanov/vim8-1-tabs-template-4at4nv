import { NgModule } from '@angular/core';
import TabContentComponent from './tab-elements/tab-content.component';
import TabTitleComponent from './tab-elements/tab-title.component';
import TabComponent from './tab.component';

@NgModule({
  imports:      [],
  declarations: [TabTitleComponent, TabContentComponent, TabComponent],
  exports: [TabTitleComponent, TabContentComponent, TabComponent],
  bootstrap:    []
})
export class TabModule { }