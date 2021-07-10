import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { IStateQuery, STATE_QUERY } from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  projects: Project[];
};

@Component({
  selector: 'bis-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectPageComponent implements OnInit {
  readonly state$ = this.state.select();
  private readonly onInit$ = new Subject();

  constructor(
    private state: RxState<State>,
    @Inject(STATE_QUERY)
    private stateQueryService: IStateQuery
  ) {}

  ngOnInit() {
    this.setupEventHandler();
    this.onInit$.next();
  }

  private setupEventHandler() {
    this.state.connect('projects', this.stateQueryService.projects$());
  }
}
