import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  description: string;
};

@Component({
  selector: 'bis-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BoardDetailComponent implements OnInit {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  inprogress = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
  ];
  confirm = [];
  done = [];
  readonly state$ = this.state.select();

  private readonly onInit$ = new Subject();

  constructor(private state: RxState<State>) {
    this.state.set({
      description: `プロジェクトのボード機能を開発する。
フロントエンドの実装、APIの実装、結合まで完了させる。`,
    });
  }

  ngOnInit() {
    this.onInit$.next();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
