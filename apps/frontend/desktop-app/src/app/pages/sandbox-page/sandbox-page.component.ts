import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Project, Task } from '@bison/frontend/domain';
import { Board, COLOR } from '@bison/shared/domain';
import {
    Board as ApiBoard,
    Project as ApiProject,
    Status,
    Subtask as ApiSubtask,
    Task as ApiTask,
    TaskGroup as ApiTaskGroup,
    User as ApiUser
} from '@bison/shared/schema';
import { convertToDomainTaskFromApiTask } from '../../util/convert-to-domain-task-from-api-task';

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

  readonly task: Task = convertToDomainTaskFromApiTask({
    id: 'task0010',
    title: 'ボード詳細画面',
    description: 'ボード詳細画面の実装',
    status: Status.INPROGRESS,
    workTimeSec: 12600,
    scheduledTimeSec: 18000,
    subtasksOrder: [],
    board: {
      id: 'board0001',
      name: 'Sprint202101aaaaaaaaaaaaSprint202101aaaaaaaaaaaa',
      description: 'スプリント 2021/01\nhoge',
      project: {
        id: 'project0001',
        name: 'Bison',
      } as ApiProject,
    } as ApiBoard,
    assign: {
      id: 'user0005',
      name: '田中 太郎',
      icon: undefined,
    } as ApiUser,
    taskGroup: {
      id: 'taskGroup0002',
      title: 'UI実装',
      description: 'AngularによるUI実装',
    } as ApiTaskGroup,
    subtasks: [
      {
        id: 'subtask0001',
        title: 'コンポーネント実装',
        description: 'ボード詳細画面で利用するコンポーネントの実装',
        isDone: true,
        workTimeSec: 3600,
        scheduledTimeSec: 9000,
        task: {
          id: 'task0010',
        } as ApiTask,
        assign: {
          id: 'user0005',
          name: '田中 太郎',
          icon: undefined,
        } as ApiUser,
      } as ApiSubtask,
      {
        id: 'subtask0002',
        title: 'Usecase実装',
        description: 'ボード詳細画面で利用するUsecaseの実装',
        isDone: true,
        workTimeSec: 7200,
        scheduledTimeSec: 7200,
        task: {
          id: 'task0010',
        } as ApiTask,
        assign: {
          id: 'user0005',
          name: '田中 太郎',
          icon: undefined,
        } as ApiUser,
      } as ApiSubtask,
      {
        id: 'subtask0003',
        title: 'ページコンポーネント実装',
        description: 'ページコンポーネント実装',
        isDone: false,
        workTimeSec: 0,
        task: {
          id: 'task0010',
        } as ApiTask,
        assign: undefined,
      } as ApiSubtask,
    ],
    project: {} as ApiProject,
    createdAt: new Date().valueOf(),
  } as ApiTask);
}
