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
import { Project } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  projects: Projects;
};

@Component({
  selector: 'bis-project-list-page',
  templateUrl: './project-list-page.component.html',
  styleUrls: ['./project-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectListPageComponent implements OnInit {
  readonly state$ = this.state.select();

  readonly onClickedCreateNewProject$ = new Subject();

  readonly onClickedDeleteProject$ = new Subject<Project>();

  private readonly onInit$ = new Subject();

  constructor(
    private state: RxState<State>,
    @Inject(PROJECT_STATE_QUERY_SERVICE)
    private stateQueryService: IProjectStateQueryService
  ) {
    this.state.set({
      projects: [],
    });
    // TODO: プロジェクト作成ダイアログを表示
    this.state.hold(this.onClickedCreateNewProject$, () => {});
    // TODO: プロジェクト削除ダイアログを表示
    this.state.hold(this.onClickedDeleteProject$, () => {});
  }

  ngOnInit() {
    this.setupEventHandler();
    this.onInit$.next();
  }

  private setupEventHandler() {
    this.state.connect('projects', this.stateQueryService.projects$());
  }
}
