import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';

export type Navigation = {
  menu: string,
  routerLink: string,
}

@Component({
  selector: 'ui-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  @Input() list: Navigation[] = [];
  @Output() clickNav = new EventEmitter<Navigation>();

  private readonly onDestroy$ = new Subject<void>();
  readonly onClickNavigation$ = new Subject<Navigation>();

  readonly selectedNavigation$ = this.onClickNavigation$.asObservable().pipe(
    shareReplay(1),
  );

  readonly clickNavigationHandler$ = this.onClickNavigation$.pipe(
    tap((navigation) => this.clickNav.emit(navigation)),
  );

  ngOnInit(): void {
    merge(this.clickNavigationHandler$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

}
