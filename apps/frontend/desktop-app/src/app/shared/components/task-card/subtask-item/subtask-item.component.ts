import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { Subtask } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { of, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { convertToDomainSubtaskFromApiSubtask } from '../../../../util/convert-to-domain-subtask-from-api-subtask';
import { mapToUpdatedWorkTimeSecState } from '../../../../util/custom-operators/map-to-updated-work-time-sec-state';
import { nonNullable } from '../../../../util/custom-operators/non-nullable';
import { SubtaskFacadeService } from '../../../facade/subtask-facade/subtask-facade.service';
import {
  SUBTASK_FIELDS,
  SUBTASK_FRAGMENT_NAME,
} from '../../../fragments/subtask-fragment';

type State = {
  subtaskId?: Subtask['id'];
  subtask?: Subtask;
};

@Component({
  selector: 'bis-subtask-item',
  templateUrl: './subtask-item.component.html',
  styleUrls: ['./subtask-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SubtaskItemComponent implements OnInit {
  @Input()
  set subtaskId(value: NonNullable<State['subtaskId']>) {
    this.state.set('subtaskId', () => value);
  }
  @Output() update = new EventEmitter<Subtask>();

  /**
   * State
   */
  readonly state$ = this.state.select();

  /**
   * Event
   */
  readonly onSubmitTitle$ = new Subject<Subtask['title']>();
  readonly onChangedWorkTimeSec$ = new Subject<Subtask['workTimeSec']>();
  readonly onChangedScheduledTimeSec$ = new Subject<
    NonNullable<Subtask['scheduledTimeSec']>
  >();
  readonly onClickedPlay$ = new Subject<void>();
  readonly onClickedPause$ = new Subject<void>();
  readonly onChangedIsDone$ = new Subject<boolean>();

  constructor(
    private state: RxState<State>,
    private subtaskFacade: SubtaskFacadeService,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({});
  }

  ngOnInit(): void {
    this.state.connect(
      'subtask',
      this.state.select('subtaskId').pipe(
        nonNullable(),
        switchMap((subtaskId) => {
          return this.apolloDataQuery.querySubtask(
            { fields: SUBTASK_FIELDS, name: SUBTASK_FRAGMENT_NAME },
            subtaskId
          );
        }),
        map((response) => response.data.subtask),
        nonNullable(),
        map((subtask) => {
          return convertToDomainSubtaskFromApiSubtask(subtask);
        })
      )
    );
    this.state.hold(
      this.onSubmitTitle$.pipe(
        withLatestFrom(this.state.select('subtask').pipe(nonNullable())),
        switchMap(([title, subtask]) => {
          return this.subtaskFacade.updateTitle(title, subtask);
        })
      )
    );
    this.state.hold(
      this.onChangedIsDone$.pipe(
        distinctUntilChanged(),
        filter((isDone) => {
          return isDone !== this.state.get('subtask')?.isDone;
        }),
        switchMap((isDone) => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          return this.subtaskFacade.updateIsDoone(isDone, subtask);
        })
      )
    );
    this.state.hold(
      this.onChangedWorkTimeSec$.pipe(
        mapToUpdatedWorkTimeSecState(this.state, 'subtask'),
        switchMap(({ updated, current }) => {
          return this.subtaskFacade.updateWorkTimeSec(
            updated.workTimeSec,
            updated.workStartDateTimestamp,
            current
          );
        })
      )
    );
    this.state.hold(
      this.onChangedScheduledTimeSec$.pipe(
        filter((sec) => {
          return sec !== this.state.get('subtask')?.scheduledTimeSec;
        }),
        switchMap((sec) => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          return this.subtaskFacade.updateScheduledTimeSec(sec, subtask);
        })
      )
    );
    this.state.hold(
      this.onClickedPlay$.pipe(
        switchMap(() => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          const now = new Date();
          return this.subtaskFacade.startTracking(now, subtask);
        })
      )
    );
    this.state.hold(
      this.onClickedPause$.pipe(
        switchMap(() => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          const now = new Date();
          return this.subtaskFacade.stopTracking(now, subtask);
        })
      )
    );
  }
}
