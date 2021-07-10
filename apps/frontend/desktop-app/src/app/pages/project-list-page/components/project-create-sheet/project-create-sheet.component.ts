import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Color, User } from '@bison/shared/domain';
import { User as ApiUser } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export const ME_FIELDS = gql`
  fragment MeParts on User {
    id
    name
    icon
  }
`;

const MeQuery = gql`
  ${ME_FIELDS}
  query MeQuery {
    viewer {
      ...MeParts
    }
  }
`;

const STEP = {
  inputProperty: 'inputProperty',
  selectMember: 'selectMember',
} as const;

type State = {
  color: Color;
  projectName: string;
  projectDescription: string;
  step: keyof typeof STEP;
  me?: User;
};

@Component({
  selector: 'bis-project-create-sheet',
  templateUrl: './project-create-sheet.component.html',
  styleUrls: ['./project-create-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectCreateSheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;

  readonly step = STEP;
  readonly state$ = this.state.select();
  readonly onChangedColor$ = new Subject<Color>();
  readonly onChangedProjectName$ = new Subject<State['projectName']>();
  readonly onChangedProjectDescription$ = new Subject<
    State['projectDescription']
  >();
  readonly onClickedNextStep$ = new Subject<void>();
  readonly onClickedBackStep$ = new Subject<void>();

  constructor(private state: RxState<State>, private apollo: Apollo) {}

  ngOnInit(): void {
    this.state.set({
      color: 'Gray',
      step: 'inputProperty',
    });
    this.state.connect('color', this.onChangedColor$);
    this.state.connect('projectName', this.onChangedProjectName$);
    this.state.connect('projectDescription', this.onChangedProjectDescription$);
    this.state.connect('step', this.onClickedNextStep$, () => {
      return this.step.selectMember;
    });
    this.state.connect('step', this.onClickedBackStep$, () => {
      return this.step.inputProperty;
    });
    this.state.connect('me', this.queryMe$());
  }

  private queryMe$() {
    return this.apollo
      .watchQuery<{ viewer?: ApiUser }>({
        query: MeQuery,
        fetchPolicy: 'cache-only',
      })
      .valueChanges.pipe(
        filter(
          (response): response is ApolloQueryResult<{ viewer: ApiUser }> =>
            response.data.viewer != null
        ),
        map((response) => {
          const { viewer } = response.data;
          return {
            id: viewer.id,
            name: viewer.name,
            icon: viewer.icon,
          };
        })
      );
  }
}
