import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Project } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';

type State = {
  project?: Project;
};

@Component({
  selector: 'bis-task-dialog-project-change-button',
  templateUrl: './task-dialog-project-change-button.component.html',
  styleUrls: ['./task-dialog-project-change-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogProjectChangeButtonComponent implements OnInit {
  @Input()
  set project(value: State['project']) {
    this.state.set('project', () => value);
  }

  readonly state$ = this.state.select();

  constructor(private state: RxState<State>) {}

  ngOnInit(): void {
    this.state.set({});
  }
}
