import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FETCH_PROJECTS_SERVICE,
  IFetchProjectsService,
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
    private stateQueryService: IProjectStateQueryService,
    @Inject(FETCH_PROJECTS_SERVICE)
    private fetchProjectsService: IFetchProjectsService
  ) {}

  ngOnInit() {
    this.setupEventHandler();
    this.onInit$.next();
  }

  private setupEventHandler() {
    this.state.hold(this.onInit$, () => this.fetchProjectsService.handle$());
    this.state.connect('projects', this.stateQueryService.projects$());
  }
}
