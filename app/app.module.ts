import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test.component';
import { TabsModule } from './tabs/tabs.module';
import { TabModule } from './tabs/tab-component/tab.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:      [ BrowserModule, FormsModule, TabModule, TabsModule, CommonModule ],
  declarations: [ AppComponent, HelloComponent, TestComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
