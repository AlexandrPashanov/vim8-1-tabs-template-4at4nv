import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChild, OnDestroy, OnInit, TemplateRef, ViewChild
} from '@angular/core';
import {ActiveTabService} from '../../service/active-tab.service';
import {Subscription} from 'rxjs';
import TabContentComponent from './tab-elements/tab-content.component';

@Component({
  selector: 'tab',
  templateUrl: `tab.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TabComponent implements OnInit, OnDestroy{
  @ViewChild('tabContentTemplate', {static: true}) tabContent: TemplateRef<TabContentComponent>;
  constructor(private activeTabService: ActiveTabService, private cdr: ChangeDetectorRef){  }

  isActiveTab: boolean = false;
  idNumber: number;

  activeIndexSubscription: Subscription;

  click() {
    this.activeTabService.setCurrentActiveIndex(this.idNumber);
  }

  ngOnInit(): void {
   this.activeIndexSubscription = this.activeTabService.activeIndex$.subscribe((activeIndex => {
      this.isActiveTab = activeIndex === this.idNumber;
      this.cdr.detectChanges();
    }))
  }

  ngOnDestroy(): void {
    if (this.activeIndexSubscription) {
      this.activeIndexSubscription.unsubscribe();
    }
  }
}
