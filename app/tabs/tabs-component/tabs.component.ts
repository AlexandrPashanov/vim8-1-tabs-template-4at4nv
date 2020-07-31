import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren, OnDestroy,
  OnInit,
  QueryList,
  TemplateRef
} from '@angular/core';
import TabComponent from '../tab-component/tab.component';
import {ActiveTabService} from '../../service/active-tab.service';
import {Subscription} from 'rxjs';
import TabContentComponent from '../tab-component/tab-elements/tab-content.component';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TabsComponent implements AfterContentInit, OnInit, OnDestroy {
  @ContentChildren(TabComponent) tabsList: QueryList<TabComponent>;
  private tabsListArray: TabComponent[] = [];
  private currentActiveId = 0;
  private tabListChangesSubscription: Subscription;
  public currentComponentTemplate: TemplateRef<TabContentComponent>;

  constructor(private activeTabService: ActiveTabService, private cdr: ChangeDetectorRef) {
    this.activeTabService.activeIndex$.subscribe((activeIndex => {
      this.currentActiveId = activeIndex;
      if (this.tabsListArray.length > 0) {
        this.currentComponentTemplate = this.tabsListArray[this.currentActiveId].tabContent;
        this.cdr.detectChanges();
      } else if (this.tabsListArray.length === 0) {
        this.currentComponentTemplate = undefined;
        this.currentActiveId = 0;
      }
    }));
  }

  ngAfterContentInit(): void {
    this.setTabs();
    this.activeTabService.setCurrentActiveIndex(this.currentActiveId);
    this.tabsListArray = this.tabsList.toArray();
    this.currentComponentTemplate = this.tabsListArray[this.currentActiveId].tabContent;
    this.tabListChangesSubscription = this.tabsList.changes.subscribe(tabs => {
      this.tabsListArray = tabs.toArray();
      this.setTabs();
      const checkIndex = this.tabsListArray ? this.tabsListArray.length - 1 : 0;
      if (this.currentActiveId >= checkIndex) {
        this.activeTabService.setCurrentActiveIndex(checkIndex);
      }
      this.cdr.detectChanges();
    });
    this.cdr.detectChanges();
  }

  setTabs() {
    this.tabsList.forEach((tab, index) => {
      tab.idNumber = index;
    });
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
