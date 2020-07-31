import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActiveTabService {

  public activeIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public setCurrentActiveIndex(index: number) { this.activeIndex$.next(index) }

}
