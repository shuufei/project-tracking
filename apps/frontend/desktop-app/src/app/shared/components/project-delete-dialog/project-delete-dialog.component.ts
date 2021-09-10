import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  DELETE_PROJECT_USECASE,
  IDeleteProjectUsecase,
} from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { DeleteProjectInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { merge, of, Subject } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

type State = {
  project: Project;
  isOpen: boolean;
};

@Component({
  selector: 'bis-project-delete-dialog',
  templateUrl: './project-delete-dialog.component.html',
  styleUrls: ['./project-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectDeleteDialogComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input()
  set project(value: Project) {
    this.state.set('project', () => value);
  }
  @Input() isOpen$ = new Subject<boolean>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  readonly state$ = this.state.select();
  readonly isOpenDialog$ = this.state.select('isOpen');

  readonly onClickedCloseButton$ = new Subject<void>();
  readonly onOpenedDialog$ = new Subject<void>();
  readonly onClosedDialog$ = new Subject<void>();
  readonly onClickedDeleteButton$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    @Inject(DELETE_PROJECT_USECASE)
    private deleteProjectUsecase: IDeleteProjectUsecase,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService
  ) {}

  ngOnInit(): void {
    this.state.set({
      isOpen: false,
    });
    this.state.connect('isOpen', this.isOpen$);
    this.state.connect('isOpen', this.onOpenedDialog$, () => true);
    this.state.connect('isOpen', this.onClosedDialog$, () => false);
    this.state.hold(this.isOpenDialog$, (isOpen) => {
      isOpen ? this.opened.emit() : this.closed.emit();
    });
    this.state.connect('isOpen', this.onClickedCloseButton$, () => false);
    this.state.hold(
      this.onClickedDeleteButton$.pipe(
        exhaustMap(() => {
          const project = this.state.get('project');
          if (project == null) {
            return of();
          }
          return this.deleteProject(project);
        })
      )
    );
  }

  private deleteProject(project: Project) {
    const input: DeleteProjectInput = {
      id: project.id,
    };
    this.state.set('isOpen', () => false);
    this.delete.emit();
    return merge(
      this.deleteProjectUsecase.execute(input),
      this.notificationsService.show('プロジェクトを削除しました', {
        hasCloseButton: true,
      })
    );
  }
}
