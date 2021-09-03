import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
};

@Component({
  selector: 'bis-project-detail-header',
  templateUrl: './project-detail-header.component.html',
  styleUrls: ['./project-detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectDetailHeaderComponent implements OnInit {

  readonly state$ = this.state.select();

  private readonly onInit$ = new Subject();

  constructor(private state: RxState<State>) {
    this.state.set({
    });
  }

  ngOnInit(): void {
    this.onInit$.next();
  }
}
