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
  IUpdateProjectMembersUsecase,
  UPDATE_PROJECT_MEMBERS_USECASE,
} from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { User } from '@bison/shared/domain';
import { UpdateProjectMembersInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { gql } from 'apollo-angular';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { exhaustMap, filter, map, switchMap } from 'rxjs/operators';

const USER_FIELDS = gql`
  fragment UserPartsInProjectMemberUpdateSheet on User {
    id
    name
    icon
  }
`;

type State = {
  project: Project;
  isSheetOpen: boolean;
  memberIds: User['id'][];
  users: User[];
};

@Component({
  selector: 'bis-project-member-update-sheet',
  templateUrl: './project-member-update-sheet.component.html',
  styleUrls: ['./project-member-update-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectMemberUpdateSheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() set project(value: Project) {
    this.state.set((state) => {
      return {
        ...state,
        project: value,
        memberIds: value.members.map((v) => v.id),
      };
    });
  }

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isSheetOpen$ = this.state.select('isSheetOpen');
  readonly members$ = combineLatest([
    this.state.select('memberIds'),
    this.state.select('users'),
  ]).pipe(
    map(([memberIds, users]) => {
      return memberIds
        .map((memberId) => users.find((user) => user.id === memberId))
        .filter((v): v is NonNullable<typeof v> => v != null);
    })
  );

  /**
   * Event
   */
  readonly onClickedUpdate$ = new Subject<void>();
  readonly onSelectedMembers$ = new Subject<User['id'][]>();
  readonly onClosedeSheet$ = new Subject<void>();
  readonly onOpenedSheet$ = new Subject<void>();

  constructor(
    private readonly state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY)
    private readonly apolloDataQuery: IApolloDataQuery,
    @Inject(UPDATE_PROJECT_MEMBERS_USECASE)
    private readonly updateProjectMembersUsecase: IUpdateProjectMembersUsecase,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService
  ) {
    this.state.set({
      isSheetOpen: false,
    });
  }

  ngOnInit(): void {
    this.state.connect(
      'users',
      this.state.select('isSheetOpen').pipe(
        filter((v) => v),
        switchMap(() => {
          return this.queryUsers$();
        })
      )
    );
    this.state.connect('memberIds', this.onSelectedMembers$, (_, userIds) => {
      return userIds;
    });
    this.state.connect('isSheetOpen', this.onOpenedSheet$, () => true);
    this.state.connect(this.onClosedeSheet$, () => {
      return {
        isSheetOpen: false,
        members: [],
      };
    });
    this.state.hold(
      this.onClickedUpdate$.pipe(
        exhaustMap(() => {
          return this.updateProjectMembers(
            this.state.get('project'),
            this.state.get('memberIds')
          );
        })
      )
    );
  }

  private queryUsers$(): Observable<User[]> {
    return this.apolloDataQuery
      .queryUsers({
        name: 'UserPartsInProjectMemberUpdateSheet',
        fields: USER_FIELDS,
      })
      .pipe(
        map((response) => {
          const { users } = response.data;
          return users.map((user) => {
            return {
              id: user.id,
              name: user.name,
              icon: user.icon,
            };
          });
        })
      );
  }

  private updateProjectMembers(project: Project, memberIds: User['id'][]) {
    const addedMemberIds = memberIds.filter(
      (memberId) => project.members.find((v) => v.id === memberId) == null
    );
    const removedMemberIds = project.members
      .filter((member) => memberIds.find((id) => id === member.id) == null)
      .map((v) => v.id);
    const input: UpdateProjectMembersInput = {
      projectId: project.id,
      addUserIds: addedMemberIds,
      removeUserIds: removedMemberIds,
    };
    this.state.set('isSheetOpen', () => false);
    return merge(
      this.updateProjectMembersUsecase.execute(input, memberIds),
      this.notificationsService.show('プロジェクトのメンバーが更新されました', {
        hasCloseButton: true,
      })
    );
  }
}
