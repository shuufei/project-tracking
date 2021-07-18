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
import type { IconName } from '../icon/icon.component';

type State = {
  [k: string]: never;
};

@Component({
  selector: 'ui-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TextFieldComponent implements OnInit {
  @Input()
  set text(value: string) {
    if (value === this.textFormCtrl.value) {
      return;
    }
    this.textFormCtrl.setValue(value, { emitEvent: false });
  }
  @Input() icon?: IconName;
  @Input() placeholder = '';
  @Input() borderless = false;
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
