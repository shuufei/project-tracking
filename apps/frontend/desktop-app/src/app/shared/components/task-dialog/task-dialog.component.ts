import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Project } from '@bison/frontend/domain';
import { Board, COLOR, Task } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  task?: Task;
  isOpenDialog: boolean;
};

@Component({
  selector: 'bis-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() isOpen$ = new Subject<boolean>();
  @Input() set task(value: Task) {
    this.state.set('task', () => value);
  }

  readonly project: Project = {
    id: 'project0001',
    name: 'name',
    description: 'description',
    color: COLOR.Red,
    admin: {
      id: 'id',
      name: 'admin name',
    },
    members: [
      {
        id: 'user0001',
        name: 'user name 0001',
      },
    ],
  };
  readonly boards: Board[] = [
    {
      id: 'board0001',
      name: 'board 0001',
      description:
        'プロジェクト管理サービスの開発。\nプロジェクト管理サービスの開発。',
      projectId: this.project.id,
      tasksOrder: [],
    },
    {
      id: 'board0002',
      name: 'board 0002',
      description:
        'プロジェクト管理サービスの開発。\nプロジェクト管理サービスの開発。',
      projectId: this.project.id,
      tasksOrder: [],
    },
    {
      id: 'board0003',
      name: 'backlog',
      description:
        'プロジェクト管理サービスの開発。\nプロジェクト管理サービスの開発。',
      projectId: this.project.id,
      tasksOrder: [],
    },
  ];

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isOpenDialog$ = this.state.select('isOpenDialog');

  /**
   * Event
   */
  readonly onClickedCloseButton$ = new Subject<void>();
  readonly onOpenedDialog$ = new Subject<void>();
  readonly onClosedDialog$ = new Subject<void>();

  constructor(private state: RxState<State>) {
    this.state.set({ isOpenDialog: false });
  }

  ngOnInit(): void {
    this.state.connect('isOpenDialog', this.onClickedCloseButton$, () => false);
    this.state.connect('isOpenDialog', this.onOpenedDialog$, () => true);
    this.state.connect('isOpenDialog', this.onClosedDialog$, () => false);
  }
}
