import { NgModule } from '@angular/core';
import TabContentComponent from './tab-elements/tab-content.component';
import TabTitleComponent from './tab-elements/tab-title.component';
import TabComponent from './tab.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:      [CommonModule ],
  declarations: [TabTitleComponent, TabContentComponent, TabComponent],
  exports: [TabTitleComponent, TabContentComponent, TabComponent],
  bootstrap:    []
})
export class TabModule { }