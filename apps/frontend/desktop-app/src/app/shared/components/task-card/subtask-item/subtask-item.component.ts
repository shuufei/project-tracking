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
import { Subject } from 'rxjs';
import { exhaustMap, filter, tap, withLatestFrom } from 'rxjs/operators';
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

  readonly onSubmitTitle$ = new Subject<Subtask['title']>();

  constructor(
    private state: RxState<State>,
    private subtaskFacadeService: SubtaskFacadeService
  ) {
    this.state.set({});
  }

  ngOnInit(): void {
    this.state.hold(
      this.onSubmitTitle$.pipe(
        withLatestFrom(
          this.state
            .select('subtask')
            .pipe(filter((v): v is NonNullable<typeof v> => v != null))
        ),
        tap(([title, subtask]) => {
          const updatedSubtask = {
            ...subtask,
            title,
          };
          this.state.set('subtask', () => updatedSubtask);
          this.update.emit(updatedSubtask);
        }),
        exhaustMap(([title, subtask]) => {
          return this.subtaskFacadeService.updateTitle(title, subtask);
        })
      )
    );
  }
}
