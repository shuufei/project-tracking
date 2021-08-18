import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';

type State = Record<string, never>;

@Component({
  selector: 'bis-report-sheet',
  templateUrl: './report-sheet.component.html',
  styleUrls: ['./report-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ReportSheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;

  constructor(private state: RxState<State>) {}

  ngOnInit(): void {
    return;
  }
}
