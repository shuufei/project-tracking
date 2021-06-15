import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'bis-project-sub',
  templateUrl: './project-sub.component.html',
  styleUrls: ['./project-sub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSubComponent implements OnInit, OnDestroy {

  // -- mocks --
  readonly projectMock = { id: 1, name: 'Bison', color: 'Green' };
  readonly boardsMock = [
    { id: 1, name: 'バックログ' },
    { id: 2, name: 'スプリント1' },
    { id: 3, name: 'スプリント2' },
  ];

  // -- subjects --
  readonly clickProjectSbj$ = new Subject<number>();
  private readonly destroySbj$ = new Subject<void>();

  // -- events --
  private readonly onClickProject$ = this.clickProjectSbj$.asObservable().pipe(shareReplay(1));
  private readonly onDestroy$ = this.destroySbj$.asObservable().pipe(shareReplay(1));

  // -- handlers --
  private clickProjectHandler$(
    onClickProject$: Observable<number>
  ) {
    return onClickProject$.pipe(
      tap(id => console.log(id))
    );
  }

  ngOnDestroy(): void {
    this.destroySbj$.next();
  }

  ngOnInit(): void {
    merge(this.clickProjectHandler$(this.onClickProject$)).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe();
  }


}
