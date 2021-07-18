import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
  IUpdateProjectUsecase,
  UPDATE_PROJECT_USECASE,
} from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { UpdateProjectInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { ChangedPropertyEvent } from '../../../../shared/components/project-property-edit-form/project-property-edit-form.component';
import { convertToApiColorFromDomainColor } from '../../../../util/convert-to-api-color-from-domain-color';

export const PROJECT_PARTS = gql`
  fragment ProjectParts on Project {
    id
    name
    description
    color
  }
`;

type State = {
  project: Project;
  isSheetOpen: boolean;
};

@Component({
  selector: 'bis-project-update-sheet',
  templateUrl: './project-update-sheet.component.html',
  styleUrls: ['./project-update-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectUpdateSheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() set project(value: Project) {
    this.state.set((state) => {
      return {
        ...state,
        project: value,
      };
    });
  }

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isSheetOpen$ = this.state.select('isSheetOpen');

  /**
   * Event
   */
  readonly onChangedProjectProperty$ = new Subject<ChangedPropertyEvent>();
  readonly onClickedUpdate$ = new Subject<void>();
  readonly onOpenedSheet$ = new Subject<void>();
  readonly onClosedSheet$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    @Inject(UPDATE_PROJECT_USECASE)
    private readonly updateProjectUsecase: IUpdateProjectUsecase,
    @Inject(APOLLO_DATA_QUERY)
    private readonly apolloDataQuery: IApolloDataQuery,
    @Inject(TuiNotificationsService)
    private readonly notificationService: TuiNotificationsService
  ) {
    this.state.set({});
  }

  ngOnInit(): void {
    this.state.connect(this.onChangedProjectProperty$, (state, event) => {
      return {
        ...state,
        project: {
          ...state.project,
          name: event.name,
          description: event.description,
          color: event.color,
        },
      };
    });
    this.state.hold(
      this.onClickedUpdate$.pipe(
        exhaustMap(() => this.mutateUpdateProject$(this.state.get()))
      )
    );
    this.state.connect('isSheetOpen', this.onOpenedSheet$, () => true);
    this.state.connect('isSheetOpen', this.onClosedSheet$, () => false);
  }

  private mutateUpdateProject$(state: State) {
    if (state.project == null) {
      throw new Error('');
    }
    const input: UpdateProjectInput = {
      id: state.project.id,
      name: state.project.name,
      description: state.project.description,
      color: convertToApiColorFromDomainColor(state.project.color),
      adminUserId: state.project.admin.id,
    };
    return this.updateProjectUsecase
      .execute(input, {
        name: 'ProjectParts',
        fields: PROJECT_PARTS,
      })
      .pipe(
        switchMap(() => {
          this.state.set('isSheetOpen', () => false);
          return this.notificationService.show('プロジェクトが更新されました', {
            hasCloseButton: true,
          });
        })
      );
  }
}
