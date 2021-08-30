import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  boardName: string;
};

@Component({
  selector: 'bis-board-detail-header',
  templateUrl: './board-detail-header.component.html',
  styleUrls: ['./board-detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BoardDetailHeaderComponent implements OnInit {
  readonly state$ = this.state.select();

  private readonly onInit$ = new Subject();

  constructor(private state: RxState<State>) {
    this.state.set({
      boardName: 'boardName',
    });
  }

  ngOnInit() {
    this.onInit$.next();
  }
}
