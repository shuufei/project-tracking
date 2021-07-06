import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Color } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  color: Color;
  projectName: string;
  projectDescription: string;
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

  readonly state$ = this.state.select();
  readonly onChangedColor$ = new Subject<Color>();
  readonly onChangedProjectName$ = new Subject<State['projectName']>();
  readonly onChangedProjectDescription$ = new Subject<
    State['projectDescription']
  >();

  constructor(private state: RxState<State>) {}

  ngOnInit(): void {
    this.state.set({
      color: 'Gray',
    });
    this.state.connect('color', this.onChangedColor$);
    this.state.connect('projectName', this.onChangedProjectName$);
    this.state.connect('projectDescription', this.onChangedProjectDescription$);
    this.state$.subscribe((v) => console.log(v));
  }
}
