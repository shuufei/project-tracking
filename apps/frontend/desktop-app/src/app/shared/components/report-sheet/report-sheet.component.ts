import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Task, TaskGroup } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';

type State = Record<string, never>;

@Component({
  selector: 'bis-report-sheet',
  templateUrl: './report-sheet.component.html',
  styleUrls: ['./report-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ReportSheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;

  readonly task: Task = {
    id: 'task0001',
    title: 'タスクタイトル0001',
    description: 'タスク詳細0001\nタスク詳細0001',
    status: 'INPROGRESS',
    assignUser: { id: 'user0001', name: 'user name 0001' },
    board: {
      id: 'board0001',
      name: 'board name 0001',
      description: 'board description',
      project: {
        id: 'project0001',
        name: 'project name',
      },
    },
    taskGroup: {
      id: 'taskGroup0001',
      title: 'task group name 0001',
      description: 'task group description',
    },
    workTimeSec: 60 * 60 * 1 + 60 + 30,
    scheduledTimeSec: 60 * 60 * 2,
    // workStartDateTimestamp: new Date().valueOf(),
    subtasksOrder: [],
    subtasks: [
      {
        id: 'subtask0001',
        title: 'subtask title 0001',
        description: 'subtask description 0001',
        isDone: false,
        scheduledTimeSec: 60 * 60 * 1,
        workTimeSec: 60 * 60 * 2.75,
        assignUser: {
          id: 'user0002',
          name: 'user name 0002',
        },
        taskId: 'task0001',
      },
      {
        id: 'subtask0002',
        title: 'subtask title 0002',
        description: 'subtask description 0002',
        isDone: true,
        scheduledTimeSec: 60 * 60 * 1,
        workTimeSec: 60 * 60 * 2.75,
        assignUser: {
          id: 'user0002',
          name: 'user name 0002',
        },
        taskId: 'task0001',
      },
      {
        id: 'subtask0003',
        title: 'subtask title 0003',
        description: 'subtask description 0003',
        isDone: true,
        scheduledTimeSec: 60 * 60 * 1,
        workTimeSec: 60 * 60 * 2.75,
        assignUser: {
          id: 'user0002',
          name: 'user name 0002',
        },
        taskId: 'task0001',
      },
      {
        id: 'subtask0004',
        title: 'subtask title 0004',
        description: 'subtask description 0004',
        isDone: true,
        scheduledTimeSec: 60 * 60 * 1,
        workTimeSec: 60 * 60 * 2.75,
        assignUser: {
          id: 'user0002',
          name: 'user name 0002',
        },
        taskId: 'task0001',
      },
      {
        id: 'subtask0005',
        title: 'subtask title 0005',
        description: 'subtask description 0005',
        isDone: true,
        scheduledTimeSec: 60 * 60 * 1,
        workTimeSec: 60 * 60 * 2.75,
        assignUser: {
          id: 'user0002',
          name: 'user name 0002',
        },
        taskId: 'task0001',
      },
    ],
  };

  readonly taskGroup: TaskGroup = {
    id: 'taskGroup0001',
    title: 'タスクグループ 0001',
    description: 'タスクグループ詳細¥nタスクグループ詳細',
    scheduledTimeSec: 60 * 60 * 6.5,
    status: 'INPROGRESS',
    tasksOrder: [],
    tasks: [this.task, this.task],
    board: {
      id: 'board0001',
      name: 'board name 0001',
      description: 'board description',
      projectId: 'project0001',
    },
  };

  constructor(private state: RxState<State>) {}

  ngOnInit(): void {
    return;
  }
}
