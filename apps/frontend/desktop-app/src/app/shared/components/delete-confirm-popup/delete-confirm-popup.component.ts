import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';

type State = Record<string, never>;

@Component({
  selector: 'bis-delete-confirm-popup',
  templateUrl: './delete-confirm-popup.component.html',
  styleUrls: ['./delete-confirm-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class DeleteConfirmPopupComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Output() delete = new EventEmitter<void>();

  readonly state$ = this.state.select();

  constructor(private readonly state: RxState<State>) {
    this.state.set({});
  }

  ngOnInit(): void {
    return;
  }
}
