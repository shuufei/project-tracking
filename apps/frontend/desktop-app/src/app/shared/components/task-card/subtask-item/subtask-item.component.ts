import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subtask } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { MonoTypeOperatorFunction, pipe, Subject } from 'rxjs';
import { exhaustMap, tap, withLatestFrom } from 'rxjs/operators';
import { nonNullable } from '../../../../util/custom-operators/non-nullable';
import { updateScheduledTimeSecState } from '../../../../util/custom-operators/state-updators/update-scheduled-time-sec-state';
import { updateStateOnPause } from '../../../../util/custom-operators/state-updators/update-state-on-pause';
import { updateStateOnPlay } from '../../../../util/custom-operators/state-updators/update-state-on-play';
import { updateSubtaskIsDoneState } from '../../../../util/custom-operators/state-updators/update-subtask-is-done-state';
import { updateWorkTimeSecState } from '../../../../util/custom-operators/state-updators/update-work-time-sec-state';
import { SubtaskFacadeService } from '../../../facade/subtask-facade/subtask-facade.service';

type State = {
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
  set subtask(value: NonNullable<State['subtask']>) {
    this.state.set('subtask', () => value);
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
    private subtaskFacade: SubtaskFacadeService
  ) {
    this.state.set({});
  }

  ngOnInit(): void {
    this.state.hold(
      this.onSubmitTitle$.pipe(
        withLatestFrom(this.state.select('subtask').pipe(nonNullable())),
        tap(([title, subtask]) => {
          const updatedSubtask = {
            ...subtask,
            title,
          };
          this.state.set('subtask', () => updatedSubtask);
          this.update.emit(updatedSubtask);
        }),
        exhaustMap(([title, subtask]) => {
          return this.subtaskFacade.updateTitle(title, subtask);
        })
      )
    );
    this.state.hold(
      this.onChangedIsDone$.pipe(
        updateSubtaskIsDoneState(this.state),
        this.emitUpdateEvent(),
        exhaustMap(({ updated, current }) => {
          return this.subtaskFacade.updateIsDoone(updated.isDone, current);
        })
      )
    );
    this.state.hold(
      this.onChangedWorkTimeSec$.pipe(
        updateWorkTimeSecState(this.state, 'subtask'),
        this.emitUpdateEvent(),
        exhaustMap(({ updated, current }) => {
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
        updateScheduledTimeSecState(this.state, 'subtask'),
        this.emitUpdateEvent(),
        exhaustMap(({ updated, current }) => {
          return this.subtaskFacade.updateScheduledTimeSec(
            updated.scheduledTimeSec,
            current
          );
        })
      )
    );
    this.state.hold(
      this.onClickedPlay$.pipe(
        updateStateOnPlay(this.state, 'subtask'),
        this.emitUpdateEvent(),
        exhaustMap(({ updated, current }) => {
          return this.subtaskFacade.startTracking(
            new Date(updated.workStartDateTimestamp ?? new Date()),
            current
          );
        })
      )
    );
    this.state.hold(
      this.onClickedPause$.pipe(
        updateStateOnPause(this.state, 'subtask'),
        this.emitUpdateEvent(),
        exhaustMap(({ updated }) => {
          return this.subtaskFacade.stopTracking(updated);
        })
      )
    );
  }

  private emitUpdateEvent(): MonoTypeOperatorFunction<{
    updated: Subtask;
    current: Subtask;
  }> {
    return pipe(
      tap(({ updated }) => {
        this.update.emit(updated);
      })
    );
  }
}
