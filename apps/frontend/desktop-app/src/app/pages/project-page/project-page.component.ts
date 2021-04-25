import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  IProjectStateQueryService,
  Projects,
  PROJECT_STATE_QUERY_SERVICE,
} from '@bison/frontend/application';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  projects: Projects;
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
    @Inject(PROJECT_STATE_QUERY_SERVICE)
    private stateQueryService: IProjectStateQueryService
  ) {}

  ngOnInit() {
    this.setupEventHandler();
    this.onInit$.next();
  }

  private setupEventHandler() {
    this.state.connect('projects', this.stateQueryService.projects$());
  }
}
