import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { RxState } from '@rx-angular/state';

type State = {
  [k: string]: never;
};

@Component({
  selector: 'ui-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TextareaComponent implements OnInit {
  @Input()
  set text(value: string) {
    if (value === this.textFormCtrl.value) {
      return;
    }
    this.textFormCtrl.setValue(value, { emitEvent: false });
  }
  @Input() placeholder = '';
  @Input() borderless = false;
  @Input() rows = 5;
  @Output() changedValue = new EventEmitter<string>();
  @HostBinding('class.borderless') get isBorderless() {
    return this.borderless;
  }

  readonly textFormCtrl = new FormControl('');

  constructor(private state: RxState<State>) {}

  ngOnInit() {
    this.state.hold(this.textFormCtrl.valueChanges, (value) => {
      this.changedValue.emit(value);
    });
  }
}
