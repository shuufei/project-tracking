import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { IStateQuery, STATE_QUERY } from '@bison/frontend/application';
import { Color, User } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

const STEP = {
  inputProperty: 'inputProperty',
  selectMember: 'selectMember',
} as const;

type State = {
  color: Color;
  projectName: string;
  projectDescription: string;
  step: keyof typeof STEP;
  me: User;
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

  constructor(
    private state: RxState<State>,
    @Inject(STATE_QUERY) private stateQuery: IStateQuery
  ) {}

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
    this.state.connect('me', this.stateQuery.me$());
  }
}
