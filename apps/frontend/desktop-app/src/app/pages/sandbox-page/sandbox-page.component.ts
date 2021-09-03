import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Project, Task } from '@bison/frontend/domain';
import { Board, COLOR } from '@bison/shared/domain';

@Component({
  selector: 'bis-sandbox-page',
  templateUrl: './sandbox-page.component.html',
  styleUrls: ['./sandbox-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxPageComponent {
  readonly project: Project = {
    id: 'project0001',
    name: 'name',
    description: 'description',
    color: COLOR.Red,
    admin: {
      id: 'user0001',
      name: 'user name 0001',
    },
    members: [
      {
        id: 'user0001',
        name: 'user name 0001',
      },
    ],
    boards: [],
  };
  readonly board: Board = {
    id: 'board0001',
    name: 'Bison',
    description:
      'プロジェクト管理サービスの開発。\nプロジェクト管理サービスの開発。',
    projectId: this.project.id,
    tasksOrder: [],
    createdAt: new Date().valueOf(),
  };

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
        workTimeSec: 0,
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
        workTimeSec: 0,
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
        workTimeSec: 0,
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
        workTimeSec: 0,
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
        workTimeSec: 0,
        assignUser: {
          id: 'user0002',
          name: 'user name 0002',
        },
        taskId: 'task0001',
      },
    ],
  };
}
