import { NgModule } from '@angular/core';
import TabsComponent from './tabs-component/tabs.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:      [CommonModule],
  declarations: [TabsComponent],
  exports: [TabsComponent],
  bootstrap:    []
})
export class TabsModule { }