import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, OnDestroy, OnInit
} from '@angular/core';
import {ActiveTabService} from '../../service/active-tab.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tab',
  templateUrl: `tab.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TabComponent implements OnInit, OnDestroy{

  constructor(private activeTabService: ActiveTabService, private cdr: ChangeDetectorRef){  }

  isActive: boolean = false;
  idNumber: number;

  activeIndexSubscription : Subscription;

  click() {
    this.activeTabService.setCurrentActiveIndex(this.idNumber);
  }

  ngOnInit(): void {
   this.activeIndexSubscription = this.activeTabService.activeIndex$.subscribe((activeIndex => {
      this.isActive = activeIndex === this.idNumber;
      this.cdr.detectChanges();
    }))
  }

  ngOnDestroy(): void {
    if (this.activeIndexSubscription) {
      this.activeIndexSubscription.unsubscribe();
    }
  }
}
