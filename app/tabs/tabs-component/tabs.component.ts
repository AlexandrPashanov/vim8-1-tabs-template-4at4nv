import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren, OnDestroy,
  OnInit,
  QueryList,
ViewChild,
TemplateRef
} from '@angular/core';
import TabComponent from '../tab-component/tab.component';
import {ActiveTabService} from '../../service/active-tab.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'tabs',
    templateUrl: 'tabs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TabsComponent implements AfterContentInit, OnInit, OnDestroy{
  @ContentChildren(TabComponent) tabsList: QueryList<TabComponent>;
  private currentActiveId = 0;
  private tabListChangesSubscription : Subscription;

  constructor(private activeTabService: ActiveTabService, private cdr: ChangeDetectorRef) {
    this.activeTabService.activeIndex$.subscribe((activeIndex => {
      this.currentActiveId = activeIndex;
    }))
  }

  ngAfterContentInit(): void {
    this.setTabs();
    this.activeTabService.setCurrentActiveIndex(this.currentActiveId);
    this.tabListChangesSubscription = this.tabsList.changes.subscribe(tabs => {
      this.tabsList = tabs.toArray();
      this.setTabs();
      const checkIndex = this.tabsList ? this.tabsList.length - 1 : 0;
      if (this.currentActiveId > checkIndex) {
        this.activeTabService.setCurrentActiveIndex(checkIndex);
      }
      this.cdr.detectChanges();
    });
  }

  setTabs() {
    this.tabsList.forEach((tab, index) => {
      tab.idNumber = index;
    })
  }

  ngOnInit(): void {
    this.activeTabService.setCurrentActiveIndex(0);
  }

  ngOnDestroy(): void {
    if (this.tabListChangesSubscription) {
      this.tabListChangesSubscription.unsubscribe();
    }
  }

}
